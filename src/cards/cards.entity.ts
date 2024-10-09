import { Column, PrimaryKey, Model, Table, DataType, Unique, AutoIncrement, ForeignKey } from "sequelize-typescript";
import { Account } from "src/accounts/accounts.entity";


@Table
export class Card extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    cardId: number

    @Column(DataType.DECIMAL(4,0))
    pin: number
}