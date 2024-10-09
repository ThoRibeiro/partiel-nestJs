import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountsProviders } from './accounts.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersProviders } from 'src/users/users.provider';
import { CardsProviders } from 'src/cards/cards.provider';
import { DealsProviders } from 'src/deals/deals.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    ...AccountsProviders,
    ...UsersProviders,
    ...CardsProviders,
    ...DealsProviders,
  ],
  exports: [...AccountsProviders],
})
export class AccountsModule {}
