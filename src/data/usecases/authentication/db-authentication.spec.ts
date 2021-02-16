/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountModel } from '../../../domain/models/account';
import LoadAccountByEmailRepository from '../../protocols/load-account-by-email-repository';
import DbAuthentication from './db-authentication';

const makeLoadAccountByEmailRepositoryStub = () : LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(_email: string): Promise<AccountModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};
const makeFakeAuthenticationModel = () => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

interface SutTypes {
  sut: DbAuthentication,
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
}
const makeSut = () => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
  return { sut, loadAccountByEmailRepositoryStub };
};
describe('DbAuthentication Usecase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthenticationModel());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
