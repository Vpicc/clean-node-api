/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AddSurveyController from './add-survey-controller';
import {
  Controller, HttpRequest, Validation, AddSurveyModel, AddSurvey,
} from './add-survey-controller-protocols';
import { badRequest } from '../../../helpers/http/http-helper';

const makeFakeSurvey = () => (
  {
    question: 'any question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }],
  }
);

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeSurvey(),
});

interface SutTypes {
  sut: Controller,
  validationStub: Validation,
  addSurveyStub: AddSurvey,
}

const makeAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyModel): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyStub();
};

const makeValidationStub = () => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeSut = () : SutTypes => {
  const validationStub = makeValidationStub();
  const addSurveyStub = makeAddSurveyStub();
  const sut = new AddSurveyController(validationStub, addSurveyStub);
  return { sut, validationStub, addSurveyStub };
};

describe('AddSurvey Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(makeFakeSurvey());
  });

  test('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurvey());
  });
});
