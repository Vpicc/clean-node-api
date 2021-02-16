import {
  AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher,
} from './db-add-account-protocols';

export default class DbAddAccount implements AddAccount {
  private readonly hasher;

  private readonly addAccountRepository;

  constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
