import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountsProviders } from './accounts.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService, ...AccountsProviders],
  exports: [...AccountsProviders],
})
export class AccountsModule {}
