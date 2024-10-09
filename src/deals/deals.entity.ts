import {
  Column,
  PrimaryKey,
  Model,
  Table,
  DataType,
  Unique,
  AutoIncrement,
} from 'sequelize-typescript';
import { EDealType } from './deal.enum';

@Table
export class Deal extends Model {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.DECIMAL)
  amount: number;

  @Column
  date: Date;

  @Column
  type: EDealType;
}
