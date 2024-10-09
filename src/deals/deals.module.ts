import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DatabaseModule } from 'src/database/database.module';
import { DealsController } from './deals.controller';

@Module({
  imports: [DatabaseModule],
  providers: [DealsService],
  controllers: [DealsController]

})
export class DealsModule {}
