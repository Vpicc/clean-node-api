/* eslint-disable no-underscore-dangle */
import { Collection } from 'mongodb';
import MongoHelper from '../helpers/mongo-helper';
import AccountMongoRepository from './account';

const makeFakeAddAccountModel = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

interface SutTypes {
  sut: AccountMongoRepository,
}

let accountCollection: Collection;

const makeSut = () : SutTypes => {
  const sut = new AccountMongoRepository();
  return { sut };
};

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  test('should return an account on add success', async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAddAccountModel());
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('should return an account on loadByEmail success', async () => {
    const { sut } = makeSut();
    await accountCollection.insertOne(makeFakeAddAccountModel());
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeTruthy();
    expect(account?.id).toBeTruthy();
    expect(account?.name).toBe('any_name');
    expect(account?.email).toBe('any_email@mail.com');
    expect(account?.password).toBe('any_password');
  });

  test('should return null on loadByEmail failure', async () => {
    const { sut } = makeSut();
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeNull();
  });

  test('should update the account accessToken on updateAccessToken success', async () => {
    const { sut } = makeSut();
    const result = await accountCollection.insertOne(makeFakeAddAccountModel());
    const response = result.ops[0];
    expect(response.accessToken).toBeFalsy();
    await sut.updateAccessToken(response._id, 'any_token');
    const account = await accountCollection.findOne({ _id: response._id });
    expect(account).toBeTruthy();
    expect(account?.accessToken).toBe('any_token');
  });
});
