import { Injectable, Inject, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Card } from './cards.entity';
import { Account } from 'src/accounts/accounts.entity';
import { ICard } from './cards.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARD_REPOSITORY') private readonly cardRepository: typeof Card,
    @Inject('ACCOUNT_REPOSITORY') private readonly accountRepository: typeof Account,
    private readonly jwtService: JwtService,
  ) {}

  async create(cardData: ICard & { accountId: number }): Promise<Card> {
    const { accountId, numberCard, pin } = cardData;

    const account = await this.accountRepository.findOne({ where: { id: accountId } });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return await this.cardRepository.create<Card>({...Card});
  }

  async authenticate(cardNumber: number, pin: number): Promise<{ token: string; account: Account }> {
    const card = await this.cardRepository.findOne({
      where: { numberCard: cardNumber, pin },
      include: [Account],
    });

    if (!card) {
      throw new UnauthorizedException('Invalid card number or PIN');
    }

    const account = await this.accountRepository.findOne({
      where: { id: card['accountId'] },
      include: [{ all: true }],
    });

    if (!account) {
      throw new NotFoundException('Account associated with card not found');
    }

    const payload = { accountId: account.id };
    const token = this.jwtService.sign(payload);

    return { token, account };
  }
}
