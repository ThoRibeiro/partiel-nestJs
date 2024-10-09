import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ICard } from './cards.interface';
import { Card } from './cards.entity';
import { Account } from 'src/accounts/accounts.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('create')
  async create(@Body('card') cardData: ICard): Promise<Card> {
    return this.cardsService.create(cardData);
  }

  @Post('auth')
  async authenticate(
    @Body('card') cardData: { cardId: number; pin: number },
  ): Promise<{ token: string}> {
    const { cardId, pin } = cardData;
    try {
      return await this.cardsService.authenticate(cardId, pin);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
