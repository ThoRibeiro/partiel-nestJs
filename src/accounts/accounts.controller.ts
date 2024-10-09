import { Body, Controller, Post } from '@nestjs/common';
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
}
