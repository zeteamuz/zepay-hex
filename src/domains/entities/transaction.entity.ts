import { AccountId } from './account.entity';
import { ActivityEntity } from './activity.entity';
import { MoneyEntity } from './money.entity';

export class TransactionEntity {
  private readonly _activities: ActivityEntity[] = [];

  get activities(): ActivityEntity[] {
    return this._activities;
  }

  addActivity(activity: ActivityEntity): TransactionEntity {
    this.activities.push(activity);
    return this;
  }

  public calculateBalance(accountId: AccountId): MoneyEntity {
    const depositBalance = this.activities
      .filter((activity) => activity.targetAccountId === accountId)
      .map((activity) => activity.money)
      .reduce(MoneyEntity.add, MoneyEntity.ZERO());

    const withdrawalBalance = this.activities
      .filter((activity) => activity.sourceAccountId === accountId)
      .map((activity) => activity.money)
      .reduce(MoneyEntity.add, MoneyEntity.ZERO());

    return MoneyEntity.add(depositBalance, withdrawalBalance.negate());
  }
}
