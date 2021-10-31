import { AccountEntity } from 'domains/entities/account.entity';

export interface UpdateAccountStatePort {
  updateActivities(account: AccountEntity);
}
