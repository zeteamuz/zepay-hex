import { AccountEntity, AccountId } from 'domains/entities/account.entity';

export interface LoadAccountPort {
  loadAccount(accountId: AccountId): AccountEntity;
}
