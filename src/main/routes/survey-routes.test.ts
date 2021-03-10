import { Collection } from 'mongodb';
import request from 'supertest';
import MongoHelper from '../../infra/db/mongodb/helpers/mongo-helper';
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
  });
  describe('POST /surveys', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurvey())
        .expect(204);
    });
  });
});
