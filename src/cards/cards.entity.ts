import { Column, PrimaryKey, Model, Table, DataType, Unique, AutoIncrement } from "sequelize-typescript";


@Table
export class Card extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    numberCard: number

    @Column(DataType.DECIMAL(4,0))
    pin: number
}