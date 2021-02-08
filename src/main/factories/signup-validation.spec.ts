import ValidationComposite from '../../presentation/helpers/validators/validation-composite';
import RequiredFieldValidation from '../../presentation/helpers/validators/required-field-validation';
import makeSignupValidation from './signup-validation';
import Validation from '../../presentation/helpers/validators/validation';

jest.mock('../../presentation/helpers/validators/validation-composite');

describe('SignUpValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    ['name', 'email', 'password', 'passwordConfirmation'].forEach((field) => {
      validations.push(new RequiredFieldValidation(field));
    });
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
