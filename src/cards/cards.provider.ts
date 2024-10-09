import { Card } from "./cards.entity";


export const cardsProviders = [
  {
    provide: 'CARD_REPOSITORY',
    useValue: Card,
  },
];