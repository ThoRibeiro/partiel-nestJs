import { Deal } from "./deals.entity";

export const DealsProviders = [
  {
    provide: 'DEAL_REPOSITORY',
    useValue: Deal,
  },
];