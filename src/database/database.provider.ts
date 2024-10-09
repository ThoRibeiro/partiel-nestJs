import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/accounts/accounts.entity';
import { Card } from 'src/cards/cards.entity';
import { Deal } from 'src/deals/deals.entity';
import { User } from 'src/users/users.entity';


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
            sequelize.addModels([User, Account, Card, Deal])
            // user 
            User.hasMany(Account)
            
            // account
            Account.hasMany(Card)
            Account.hasMany(Deal)
            Account.belongsTo(User)
            Account.belongsTo(Card)

            // deal
            Deal.belongsTo(Card)
            
            // card
            Card.belongsTo(User)
            Card.hasMany(Deal)

            await sequelize.sync({force: true})
            return sequelize;
        },
    },
]