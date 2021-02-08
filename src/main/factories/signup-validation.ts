import RequiredFieldValidation from '../../presentation/helpers/validators/required-field-validation';
import Validation from '../../presentation/helpers/validators/validation';
import ValidationComposite from '../../presentation/helpers/validators/validation-composite';

const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['name', 'email', 'password', 'passwordConfirmation'].forEach((field) => {
    validations.push(new RequiredFieldValidation(field));
  });
  return new ValidationComposite(validations);
};

export default makeSignupValidation;
