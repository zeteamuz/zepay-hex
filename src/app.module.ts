import { Module } from '@nestjs/common';
import { AccountPersistenceModule } from 'modules/account-persistence/account-persistence.module';
import { AccountWebModule } from 'modules/account-web/account-web.module';

@Module({
  imports: [AccountWebModule, AccountPersistenceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
