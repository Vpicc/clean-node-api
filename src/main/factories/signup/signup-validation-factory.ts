import {
  RequiredFieldValidation, CompareFieldsValidation, ValidationComposite, EmailValidation,
} from '../../../presentation/helpers/validators';
import Validation from '../../../presentation/protocols/validation';
import EmailValidatorAdapter from '../../../utils/email-validator-adapter';

const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['name', 'email', 'password', 'passwordConfirmation'].forEach((field) => {
    validations.push(new RequiredFieldValidation(field));
  });
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

export default makeSignupValidation;
