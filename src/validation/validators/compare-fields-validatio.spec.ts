import { InvalidParamError } from '../../presentation/errors';
import CompareFieldsValidation from './compare-fields-validation';

interface SutTypes {
  sut: CompareFieldsValidation,
}

const makeSut = (): SutTypes => ({ sut: new CompareFieldsValidation('original', 'field') });
describe('CompareFields Validation', () => {
  test('should return MissingParamError if validation fails', () => {
    const { sut } = makeSut();
    const response = sut.validate({ original: 'any_name', field: 'wrong_name' });
    expect(response).toEqual(new InvalidParamError('field'));
  });
  test('should return null if validation succeeds', () => {
    const { sut } = makeSut();
    const response = sut.validate({ original: 'any_name', field: 'any_name' });
    expect(response).toEqual(null);
  });
});
