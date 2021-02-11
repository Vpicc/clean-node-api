/* eslint-disable @typescript-eslint/no-unused-vars */
import { Validation } from '../../controllers/signup/signup-protocols';
import { MissingParamError } from '../../errors';

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
  validationStub: Validation,
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const sut = new ValidationComposite([validationStub]);
  return { sut, validationStub };
};
describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const response = sut.validate({ name: 'any_name' });
    expect(response).toEqual(new MissingParamError('field'));
  });
});
