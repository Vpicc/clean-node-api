import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '../../../../../validation/validators';
import Validation from '../../../../../presentation/protocols/validation';
import EmailValidatorAdapter from '../../../../../infra/validators/email-validator-adapter';

const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['email', 'password'].forEach((field) => {
    validations.push(new RequiredFieldValidation(field));
  });
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

export default makeLoginValidation;
