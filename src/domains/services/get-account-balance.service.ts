import { AccountId } from 'domains/entities/account.entity';
import { MoneyEntity } from 'domains/entities/money.entity';
import { GetAccountBalanceQuery } from 'domains/ports/in/get-account-balance.query';
import { LoadAccountPort } from 'domains/ports/out/load-account.port';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(private readonly _loadAccountPort: LoadAccountPort) {}
  async getAccountBalance(accountId: AccountId): Promise<MoneyEntity> {
    const account = await this._loadAccountPort.loadAccount(accountId);
    return account.calculateBalance();
  }
}
