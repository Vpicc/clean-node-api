/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from '../protocols';
import { forbidden } from '../helpers/http/http-helper';
import { AccessDeniedError } from '../errors';
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token';
import AuthMiddleware from './auth-middleware';
import { AccountModel } from '../../domain/models/account';

const makeFakeAccount = () => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password',
});

const makeFakeRequest = () => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

const makeLoadAccountByTokenStub = () => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string) : Promise<AccountModel | null> {
      return Promise.resolve(makeFakeAccount());
    }
  }
  return new LoadAccountByTokenStub();
};

interface SutTypes {
  sut: AuthMiddleware,
  loadAccountByTokenStub: LoadAccountByToken,
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub);
  return { sut, loadAccountByTokenStub };
};

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({} as HttpRequest);
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});