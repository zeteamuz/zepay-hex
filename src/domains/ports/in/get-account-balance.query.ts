import { AccountId } from 'domains/entities/account.entity';
import { MoneyEntity } from 'domains/entities/money.entity';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): Promise<MoneyEntity>;
}
