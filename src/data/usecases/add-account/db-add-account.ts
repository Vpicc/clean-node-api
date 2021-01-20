import {
  AccountModel, AddAccount, AddAccountModel, Encrypter,
} from './db-add-account-protocols';

export default class DbAddAccount implements AddAccount {
  private readonly encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return Promise.resolve({} as AccountModel);
  }
}
