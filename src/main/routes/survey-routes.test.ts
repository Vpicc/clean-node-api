/* eslint-disable no-underscore-dangle */
import { Collection } from 'mongodb';
import request from 'supertest';
import { sign } from 'jsonwebtoken';
import MongoHelper from '../../infra/db/mongodb/helpers/mongo-helper';
import env from '../config/env';
import app from '../config/app';
import { AddSurveyModel } from '../../domain/usecases/add-survey';

const makeFakeSurvey = () : AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    answer: 'Answer 1',
    image: 'http://image-name.com',
  },
  { answer: 'Answer 2' },
  ],
});

let surveyCollection: Collection;
let accountCollection: Collection;

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });
  describe('POST /surveys', () => {
    test('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurvey())
        .expect(403);
    });

    test('should return 204 on add survey with valid accessToken', async () => {
      const account = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'valid_password',
        role: 'admin',
      };
      const res = await accountCollection.insertOne(account);
      const id = res.ops[0]._id;
      const accessToken = sign({ id }, env.jwtSecret);
      await accountCollection.updateOne({
        _id: id,
      }, {
        $set: {
          accessToken,
        },
      });
      console.log(await accountCollection.findOne({ _id: id }));
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurvey())
        .expect(204);
    });
  });
});
