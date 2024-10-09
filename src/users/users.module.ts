import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersProviders } from './users.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...UsersProviders],
  controllers: [UsersController]
})
export class UsersModule {}
