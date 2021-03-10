import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators';
import Validation from '../../../../presentation/protocols/validation';

const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['question', 'answers'].forEach((field) => {
    validations.push(new RequiredFieldValidation(field));
  });
  return new ValidationComposite(validations);
};

export default makeAddSurveyValidation;
