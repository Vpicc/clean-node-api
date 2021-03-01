/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationComposite, EmailValidation, RequiredFieldValidation, CompareFieldsValidation,
} from '../../../../validation/validators';
import makeSignupValidation from './signup-validation-factory';
import Validation from '../../../../presentation/protocols/validation';
import EmailValidator from '../../../../validation/protocols/email-validator';

jest.mock('../../../../validation/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    ['name', 'email', 'password', 'passwordConfirmation'].forEach((field) => {
      validations.push(new RequiredFieldValidation(field));
    });
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
