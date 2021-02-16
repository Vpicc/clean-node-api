/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Hasher,
} from './db-add-account-protocols';

import DbAddAccount from './db-add-account';

const makeFakeAccount = () : AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
});

const makeFakeAccountData = () : AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
});

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(_value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};

const makeAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount();
      return fakeAccount;
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  hasherStub: Hasher,
  addAccountRepositoryStub: AddAccountRepository,
  sut: DbAddAccount,
}
const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub);
  return { sut, hasherStub, addAccountRepositoryStub };
};

describe('DbAddAccount Usecase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    const accountData = makeFakeAccountData();
    await sut.add(accountData);
    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });
  test('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()));
    const accountData = makeFakeAccountData();
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = makeFakeAccountData();
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });
  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()));
    const accountData = makeFakeAccountData();
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
  test('should return an account on success', async () => {
    const { sut } = makeSut();
    const accountData = makeFakeAccountData();
    const account = await sut.add(accountData);
    expect(account).toEqual(makeFakeAccount());
  });
});
