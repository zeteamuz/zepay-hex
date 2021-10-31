import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { AccountEntity, AccountId } from '../../entities/account.entity';
import { MoneyEntity } from '../../entities/money.entity';
import { SendMoneyCommand } from '../../ports/in/send-money.command';
import { LoadAccountPort } from '../../ports/out/load-account.port';
import { UpdateAccountStatePort } from '../../ports/out/update-account.port';
import { SendMoneyService } from '../send-money.service';

describe('SendMoneyService', () => {
  it('should transaction success', () => {
    const loadAccountPort = mock<LoadAccountPort>();
    const updateAccountPort = mock<UpdateAccountStatePort>();

    function givenAccountWithId(accountId: AccountId): AccountEntity {
      const mockedAccountEntity = mock(AccountEntity);
      when(mockedAccountEntity.id).thenReturn(accountId);
      when(mockedAccountEntity.withdraw(anything(), anyString())).thenReturn(true);
      when(mockedAccountEntity.deposit(anything(), anyString())).thenReturn(true);
      const account = instance(mockedAccountEntity);
      when(loadAccountPort.loadAccount(accountId)).thenReturn(account);
      return account;
    }

    const sourceAccount = givenAccountWithId('41');
    const targetAccount = givenAccountWithId('42');

    const command = new SendMoneyCommand(sourceAccount.id, targetAccount.id, MoneyEntity.of(300));
    const sendMoneyService = new SendMoneyService(instance(loadAccountPort), instance(updateAccountPort));
    const result = sendMoneyService.sendMoney(command);
    expect(result).toBeTruthy();
  });
});
