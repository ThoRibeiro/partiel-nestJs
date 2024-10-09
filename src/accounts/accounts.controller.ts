import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { IAccount } from './accounts.interface';
import { Account } from './accounts.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Post()
  async createAccount(
    @Body('account') accountData: IAccount,
  ): Promise<Account> {
    return this.accountService.createAccount(accountData);
  }

  @Put(':id')
  async updateAccount(
    @Param('id') id: number,
    @Body('account') accountData: IAccount,
  ): Promise<Account> {
    return this.accountService.updateAccount(id, accountData);
  }

  @Get(':userId/deals')
  async getLastOperations(@Param('userId') userId: number) {
    return this.accountService.getLastDeals(userId);
  }
}
