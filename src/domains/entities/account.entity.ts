import { ActivityEntity } from './activity.entity';
import { MoneyEntity } from './money.entity';
import { TransactionEntity } from './transaction.entity';

export type AccountId = string;

export class AccountEntity {
  constructor(
    private readonly _id: AccountId,
    private readonly _baseLineBalance: MoneyEntity,
    private readonly _transaction: TransactionEntity,
  ) {}

  get id(): AccountId {
    return this._id;
  }

  get baseLineBalance(): MoneyEntity {
    return this._baseLineBalance;
  }

  get transaction(): TransactionEntity {
    return this._transaction;
  }

  public calculateBalance(): MoneyEntity {
    return MoneyEntity.add(
      this._baseLineBalance,
      this._transaction.calculateBalance(this.id),
    );
  }

  public withdraw(amount: MoneyEntity, targetAccountId: AccountId): boolean {
    if (!this._mayWithdrawMoney(amount)) {
      return false;
    }
    const withdrawal = new ActivityEntity(
      this._id,
      targetAccountId,
      amount,
      new Date(),
    );
    this.transaction.addActivity(withdrawal);
    return true;
  }

  public deposit(amount: MoneyEntity, sourceAccountId: AccountId): boolean {
    const deposit = new ActivityEntity(
      sourceAccountId,
      this._id,
      amount,
      new Date(),
    );
    this.transaction.addActivity(deposit);
    return true;
  }

  private _mayWithdrawMoney(amount: MoneyEntity): boolean {
    return MoneyEntity.add(
      this.calculateBalance(),
      amount.negate(),
    ).isPositiveOrZero();
  }
}
