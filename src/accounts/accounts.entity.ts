import { Column, PrimaryKey, Model, Table, DataType, Unique, IsIn, AutoIncrement } from "sequelize-typescript";
import { EAccountLabel } from "./accounts.enum";

@Table
export class Account extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column(DataType.STRING(34))
    accountNumber: string

    @IsIn([[EAccountLabel.CURRENT, EAccountLabel.LIVRET_A, EAccountLabel.PROFESSIONAL, EAccountLabel.COMMON]])
    @Column
    label: EAccountLabel

    @Column(DataType.DECIMAL(10,2))
    amount: number

}