/* eslint-disable @typescript-eslint/no-unused-vars */
import { Validation } from '../../../protocols';
import AddSurveyController from './add-survey-controller';
import { Controller, HttpRequest } from './add-survey-controller-protocols';
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
}

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
  const sut = new AddSurveyController(validationStub);
  return { sut, validationStub };
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
});
