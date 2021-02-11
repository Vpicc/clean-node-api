import { MissingParamError } from '../../errors';
import RequiredFieldValidation from './required-field-validation';

describe('RequiredField Validation', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field');
    const response = sut.validate({ name: 'any_name' });
    expect(response).toEqual(new MissingParamError('field'));
  });
  test('should return MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field');
    const response = sut.validate({ field: 'any' });
    expect(response).toEqual(null);
  });
});
