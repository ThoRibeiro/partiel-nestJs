import { EAccountLabel } from './accounts.enum';

export interface IAccount {
  id: number;
  accountNumber: string;
  label: EAccountLabel;
  amount: number;
  numberCard: number;
  userId: number;
  cardId: number;
}
