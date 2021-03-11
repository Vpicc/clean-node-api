/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Decrypter from '../../protocols/criptography/decrypter';
import { AccountModel } from '../add-account/db-add-account-protocols';
import DbLoadAccountByToken from './db-load-account-by-token';
import LoadAccountByTokenRepository from '../../protocols/db/account/load-account-by-token-repository';

const makeFakeAccount = () : AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
});

const makeloadAccountByTokenRepositoryStub = () : LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(tokem: string, role?: string) : Promise<AccountModel | null> {
      return Promise.resolve(makeFakeAccount());
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(value: string): Promise<string | null> {
      return Promise.resolve('any_value');
    }
  }
  return new DecrypterStub();
};

interface SutTypes {
  sut: DbLoadAccountByToken,
  decrypterStub: Decrypter,
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = () : SutTypes => {
  const decrypterStub = makeDecrypterStub();
  const loadAccountByTokenRepositoryStub = makeloadAccountByTokenRepositoryStub();
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub);
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken');
    await sut.load('any_token', 'any_role');
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_value', 'any_role');
  });

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual(makeFakeAccount());
  });
});
