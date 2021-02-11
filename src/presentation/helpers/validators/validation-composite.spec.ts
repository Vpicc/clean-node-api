/* eslint-disable @typescript-eslint/no-unused-vars */
import { Validation } from '../../controllers/signup/signup-protocols';
import { InvalidParamError, MissingParamError } from '../../errors';

import ValidationComposite from './validation-composite';

const makeValidationStub = () : Validation => {
  class ValidationStub implements Validation {
    validate(_input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

interface SutTypes {
  sut: ValidationComposite,
  validationStubs: Validation[],
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()];
  const sut = new ValidationComposite(validationStubs);
  return { sut, validationStubs };
};
describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const response = sut.validate({ name: 'any_name' });
    expect(response).toEqual(new MissingParamError('field'));
  });

  test('should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new InvalidParamError('field'));
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field2'));
    const response = sut.validate({ name: 'any_name' });
    expect(response).toEqual(new InvalidParamError('field'));
  });
});
