import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Account } from './accounts.entity';
import { EAccountLabel } from './accounts.enum';
import { IAccount } from './accounts.interface';
import { User } from 'src/users/users.entity';
import { Card } from 'src/cards/cards.entity';
import { Deal } from 'src/deals/deals.entity';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountRepository: typeof Account,
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
    @Inject('CARD_REPOSITORY') private readonly cardRepository: typeof Card,
    @Inject('DEAL_REPOSITORY') private readonly dealRepository: typeof Deal,
  ) {}

  async createAccount(accountData: IAccount): Promise<Account> {
    // Validation des règles d'association des cartes
    const { label, numberCard } = accountData;

    const user = await this.userRepository.findOne({
      where: { id: accountData.userId },
    });
    if (!user) {
      throw Error('Account not found');
    }

    if (label === EAccountLabel.LIVRET_A && numberCard) {
      throw new BadRequestException(
        'Les livrets A ne peuvent pas avoir de carte bleue.',
      );
    }

    if (
      label !== EAccountLabel.COMMON &&
      label !== EAccountLabel.CURRENT &&
      label !== EAccountLabel.PROFESSIONAL &&
      numberCard
    ) {
      throw new BadRequestException(
        'Seuls les comptes courant, pro, et commun peuvent avoir une carte bleue.',
      );
    }

    if (label === EAccountLabel.COMMON && numberCard > 2) {
      throw new BadRequestException(
        'Un compte commun peut avoir un maximum de deux cartes bleues.',
      );
    }

    if (label !== EAccountLabel.COMMON && numberCard > 1) {
      throw new BadRequestException(
        "Les comptes non communs ne peuvent avoir qu'une seule carte.",
      );
    }

    return await this.accountRepository.create<Account>({
      ...accountData,
      UserId: accountData.userId,
    });
  }

  async updateAccount(id: number, accountData: IAccount): Promise<Account> {
    const account = await Account.findByPk(id);

    if (!account) {
      throw Error('Compte non trouvé'); // Si le compte n'existe pas
    }
    if (accountData.cardId) {
      const card = await this.cardRepository.findOne({
        where: { id: accountData.cardId },
      });

      if (!card) {
        throw new Error('Carte non trouvée'); // Si la carte n'existe pas
      }
    }

    if (accountData.label === 'LIVRET_A' && accountData.numberCard > 0) {
      throw new BadRequestException(
        'Les livrets A ne peuvent pas avoir de carte bleue.',
      );
    }
    if (
      accountData.accountNumber !== undefined ||
      accountData.label !== undefined
    ) {
      throw new BadRequestException(
        'La mise à jour de accountNumber et label est interdite.',
      ); // Impossible de modifier
    }

    if (accountData.amount !== undefined) {
      account.amount = accountData.amount;
    }

    if (accountData.numberCard !== undefined) {
      account.numberCard = accountData.numberCard;
    }
    const updatedAccountData: Partial<IAccount> = {
      amount: accountData.amount,
      numberCard: accountData.numberCard,
      ...(accountData.cardId ? { cardId: accountData.cardId } : {}), // ajouter si il existe
    };

    await this.accountRepository.update(updatedAccountData, {
      where: { id },
    });

    return await this.accountRepository.findByPk(id);
  }

  async getLastDeals(userId: number): Promise<any> {
    // Récupérer tous les comptes de l'utilisateur
    const accounts = await this.accountRepository.findAll({
      where: { userId },
    });

    const results = [];

    for (const account of accounts) {
      // Récupérer les 10 dernières opérations pour chaque compte
      const deals = await this.dealRepository.findAll({
        where: { accountId: account.id },
        order: [['date', 'DESC']],
        limit: 10,
      });

      results.push({
        accountId: account.id,
        accountNumber: account.accountNumber,
        deals: deals.map((deal) => ({
          id: deal.id,
          type: deal.type,
          amount: deal.amount,
          date: deal.date,
        })),
      });
    }

    return results;
  }
}
