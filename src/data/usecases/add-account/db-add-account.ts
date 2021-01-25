import {
  AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter,
} from './db-add-account-protocols';

export default class DbAddAccount implements AddAccount {
  private readonly encrypter;

  private readonly addAccountRepository;

  constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    await this.addAccountRepository.add({ ...accountData, password: hashedPassword });
    return Promise.resolve({} as AccountModel);
  }
}
