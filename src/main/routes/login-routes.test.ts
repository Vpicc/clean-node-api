import { Collection } from 'mongodb';
import request from 'supertest';
import { hash } from 'bcrypt';
import MongoHelper from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

let accountCollection: Collection;

const makeFakeAccount = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'valid_password',
  passwordConfirmation: 'valid_password',
});

const makeFakeLogin = () => ({
  email: 'any_email@mail.com',
  password: 'valid_password',
});

describe('Login Routes', () => {
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
  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send(makeFakeAccount())
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const account = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: await hash('valid_password', 12),
      };
      await accountCollection.insertOne(account);
      await request(app)
        .post('/api/login')
        .send(makeFakeLogin())
        .expect(200);
    });
  });
});
