import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DatabaseModule } from 'src/database/database.module';
import { DealsController } from './deals.controller';
import { DealsProviders } from './deals.provider';
import { AccountsProviders } from 'src/accounts/accounts.provider';

@Module({
  imports: [DatabaseModule],
  providers: [DealsService, ...DealsProviders, ...AccountsProviders],
  controllers: [DealsController],
  exports: [...DealsProviders],
})
export class DealsModule {}
