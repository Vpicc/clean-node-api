/* eslint-disable no-underscore-dangle */
import { Collection } from 'mongodb';
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';
import MongoHelper from '../helpers/mongo-helper';
import SurveyMongoRepository from './survey-mongo-repository';

const makeFakeSurveyData = () : AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  },
  {
    answer: 'other_answer',
  },
  ],
});

interface SutTypes {
  sut: SurveyMongoRepository,
}

let surveyCollection: Collection;

const makeSut = () : SutTypes => {
  const sut = new SurveyMongoRepository();
  return { sut };
};

describe('Survey Mongo Repository', () => {
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

  test('should add a survey on add success', async () => {
    const { sut } = makeSut();
    await sut.add(makeFakeSurveyData());
    const survey = await surveyCollection.findOne({ question: 'any_question' });
    expect(survey).toBeTruthy();
  });
});
