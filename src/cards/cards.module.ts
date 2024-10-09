import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CardsProviders } from './cards.provider';
import { AccountsProviders } from 'src/accounts/accounts.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [CardsService, ...CardsProviders, ...AccountsProviders],
  controllers: [CardsController],
  exports: [...CardsProviders]
})
export class CardsModule {}
