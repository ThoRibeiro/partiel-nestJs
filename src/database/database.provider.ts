import { Sequelize } from 'sequelize-typescript';


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 8889,
                username: 'admin',
                password: 'root',
                database: 'platinumBank',
            });
            sequelize.addModels([])
            await sequelize.sync({force: true})
            return sequelize;
        },
    },
]