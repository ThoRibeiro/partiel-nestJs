import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersProviders } from './users.provider';
import { AccountsProviders } from 'src/accounts/accounts.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...UsersProviders, ...AccountsProviders],
  controllers: [UsersController],
  exports: [...UsersProviders],
})
export class UsersModule {}
