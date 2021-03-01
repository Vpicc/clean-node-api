/* eslint-disable @typescript-eslint/no-unused-vars */
import makeSignupValidation from './login-validation-factory';
import Validation from '../../../../presentation/protocols/validation';
import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '../../../../presentation/helpers/validators';
import EmailValidator from '../../../../presentation/protocols/email-validator';

jest.mock('../../../../presentation/helpers/validators/validation-composite');

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
