import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Account } from './accounts.entity';
import { EAccountLabel } from './accounts.enum';
import { IAccount } from './accounts.interface';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountModel: typeof Account,
  ) {}

  async createAccount(accountData: IAccount): Promise<Account> {
    // Validation des règles d'association des cartes
    const { label, numberCard } = accountData;

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

    // Si toutes les validations sont respectées, créer le compte
    const account = new Account({ ...accountData });
    return account.save();
  }

  async updateAccount(id: number, accountData: IAccount): Promise<Account> {
    const account = await Account.findByPk(id);

    if (!account) {
      throw Error('Compte non trouvé'); // Si le compte n'existe pas
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

    await account.save();

    return account;
  }
}
