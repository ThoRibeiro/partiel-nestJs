import { Module } from '@nestjs/common';
import { DabController } from './dab.controller';
import { DabService } from './dab.service';

@Module({
  controllers: [DabController],
  providers: [DabService]
})
export class DabModule {}
