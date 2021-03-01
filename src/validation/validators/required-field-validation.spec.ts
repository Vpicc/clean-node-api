import { MissingParamError } from '../../presentation/errors';
import RequiredFieldValidation from './required-field-validation';

interface SutTypes {
  sut: RequiredFieldValidation,
}

const makeSut = (): SutTypes => ({ sut: new RequiredFieldValidation('field') });
describe('RequiredField Validation', () => {
  test('should return MissingParamError if validation fails', () => {
    const { sut } = makeSut();
    const response = sut.validate({ name: 'any_name' });
    expect(response).toEqual(new MissingParamError('field'));
  });
  test('should return null if validation succeeds', () => {
    const { sut } = makeSut();
    const response = sut.validate({ field: 'any' });
    expect(response).toEqual(null);
  });
});
