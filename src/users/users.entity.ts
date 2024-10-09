import { Column, PrimaryKey, Model, Table, DataType, Unique, AutoIncrement } from "sequelize-typescript";

@Table
export class User extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column(DataType.STRING(50))
    firstName: string;

    @Column
    lastName: string;

    @Unique
    @Column
    email: string;

    @Column
    address: string;

    @Column(DataType.DECIMAL(10,0))
    phoneNumber: number;
}