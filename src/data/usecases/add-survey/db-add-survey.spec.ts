/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddSurveyRepository, AddSurveyModel } from './db-add-survey-protocols';
import DbAddSurvey from './db-add-survey';

interface SutTypes {
  sut: DbAddSurvey,
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeFakeSurvey = () : AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
});

const makeAddSurveyRepositoryStub = () : AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(data: AddSurveyModel): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};

const makeSut = () : SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return { sut, addSurveyRepositoryStub };
};

describe('DbAddSurvey Usecase', () => {
  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    await sut.add(makeFakeSurvey());
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurvey());
  });
});
