import { AccountId } from './account.entity';
import { MoneyEntity } from './money.entity';

export class ActivityEntity {
  constructor(
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _money: MoneyEntity,
    private readonly _timestamp: Date,
  ) {}

  get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  get money(): MoneyEntity {
    return this._money;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}
