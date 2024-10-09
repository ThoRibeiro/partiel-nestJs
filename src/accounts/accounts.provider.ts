import { Account } from "./accounts.entity";

export const AccountsProviders = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useValue: Account,
  },
];