/* eslint-disable @typescript-eslint/no-unused-vars */
import ValidationComposite from '../../../presentation/helpers/validators/validation-composite';
import RequiredFieldValidation from '../../../presentation/helpers/validators/required-field-validation';
import makeSignupValidation from './login-validation';
import Validation from '../../../presentation/protocols/validation';
import EmailValidation from '../../../presentation/helpers/validators/email-validation';
import EmailValidator from '../../../presentation/protocols/email-validator';

jest.mock('../../../presentation/helpers/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('LoginValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    ['email', 'password'].forEach((field) => {
      validations.push(new RequiredFieldValidation(field));
    });
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
