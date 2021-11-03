import { SendMoneyCommand } from 'domains/ports/in/send-money.command';
import { SendMoneyUseCase } from 'domains/ports/in/send-money.use-case';
import { LoadAccountPort } from 'domains/ports/out/load-account.port';
import { UpdateAccountStatePort } from 'domains/ports/out/update-account.port';

export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountPort: UpdateAccountStatePort,
  ) {}

  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    const sourceAccount = await this._loadAccountPort.loadAccount(command.sourceAccountId);
    const targetAccount = await this._loadAccountPort.loadAccount(command.targetAccountId);

    if (!sourceAccount.withdraw(command.money, targetAccount.id)) {
      return false;
    }

    if (!targetAccount.deposit(command.money, sourceAccount.id)) {
      return false;
    }

    this._updateAccountPort.updateActivities(sourceAccount);
    this._updateAccountPort.updateActivities(targetAccount);

    return true;
  }
}
