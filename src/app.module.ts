import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { AccountsModule } from './accounts/accounts.module';
import { CardsModule } from './cards/cards.module';
import { DatabaseModule } from './database/database.module';
import { DealsController } from './deals/deals.controller';
import { DealsModule } from './deals/deals.module';
import { DabModule } from './dab/dab.module';
import { DabController } from './dab/dab.controller';

@Module({
  imports: [UsersModule, AccountsModule, CardsModule, DatabaseModule, DealsModule, DabModule],
  controllers: [AppController, AccountsController, DealsController, DabController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
