/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountModel } from '../../../domain/models/account';
import { HashComparer } from '../../protocols/criptography/hash-comparer';
import TokenGenerator from '../../protocols/criptography/token-generator';
import LoadAccountByEmailRepository from '../../protocols/db/load-account-by-email-repository';
import DbAuthentication from './db-authentication';

const makeFakeAccountModel = () => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
});

const makeLoadAccountByEmailRepository = () : LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(_email: string): Promise<AccountModel | null> {
      return Promise.resolve(makeFakeAccountModel());
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

const makeHashComparer = () : HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};

const makeTokenGenerator = () : TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new TokenGeneratorStub();
};

const makeFakeAuthenticationModel = () => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

interface SutTypes {
  sut: DbAuthentication,
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
  hashComparerStub: HashComparer,
  tokenGeneratorStub: TokenGenerator,
}
const makeSut = () => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const tokenGeneratorStub = makeTokenGenerator();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
  );
  return {
    sut, loadAccountByEmailRepositoryStub, hashComparerStub, tokenGeneratorStub,
  };
};
describe('DbAuthentication Usecase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthenticationModel());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(Promise.reject(new Error()));
    const response = sut.auth(makeFakeAuthenticationModel());
    await expect(response).rejects.toThrow();
  });

  test('should return null LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(Promise.resolve(null));
    const accessToken = await sut.auth(makeFakeAuthenticationModel());
    expect(accessToken).toBeNull();
  });

  test('should call HashComparer with correct password values', async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');
    await sut.auth(makeFakeAuthenticationModel());
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
  });

  test('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.reject(new Error()));
    const response = sut.auth(makeFakeAuthenticationModel());
    await expect(response).rejects.toThrow();
  });

  test('should return null HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false));
    const accessToken = await sut.auth(makeFakeAuthenticationModel());
    expect(accessToken).toBeNull();
  });

  test('should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate');
    await sut.auth(makeFakeAuthenticationModel());
    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });

  test('should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(Promise.reject(new Error()));
    const response = sut.auth(makeFakeAuthenticationModel());
    await expect(response).rejects.toThrow();
  });
});
