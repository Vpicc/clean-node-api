import RequiredFieldValidation from '../../presentation/helpers/validators/required-field-validation';
import CompareFieldsValidation from '../../presentation/helpers/validators/compare-fields-validation';
import Validation from '../../presentation/helpers/validators/validation';
import ValidationComposite from '../../presentation/helpers/validators/validation-composite';

const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['name', 'email', 'password', 'passwordConfirmation'].forEach((field) => {
    validations.push(new RequiredFieldValidation(field));
  });
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  return new ValidationComposite(validations);
};

export default makeSignupValidation;
