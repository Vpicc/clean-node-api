import RequiredFieldValidation from '../../../presentation/helpers/validators/required-field-validation';
import Validation from '../../../presentation/protocols/validation';
import ValidationComposite from '../../../presentation/helpers/validators/validation-composite';
import EmailValidation from '../../../presentation/helpers/validators/email-validation';
import EmailValidatorAdapter from '../../../utils/email-validator-adapter';

const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['email', 'password'].forEach((field) => {
    validations.push(new RequiredFieldValidation(field));
  });
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

export default makeLoginValidation;
