import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { AccountsModule } from './accounts/accounts.module';
import { CardsModule } from './cards/cards.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, AccountsModule, CardsModule, DatabaseModule],
  controllers: [AppController, AccountsController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
