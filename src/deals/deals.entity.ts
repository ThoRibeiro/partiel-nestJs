import {
  Column,
  PrimaryKey,
  Model,
  Table,
  DataType,
  Unique,
  AutoIncrement,
} from 'sequelize-typescript';

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
}
