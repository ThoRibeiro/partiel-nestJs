import { Card } from "./cards.entity";


export const CardsProviders = [
  {
    provide: 'CARD_REPOSITORY',
    useValue: Card,
  },
];