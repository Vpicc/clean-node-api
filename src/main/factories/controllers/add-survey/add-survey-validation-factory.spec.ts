/* eslint-disable @typescript-eslint/no-unused-vars */
import Validation from '../../../../presentation/protocols/validation';
import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators';
import makeAddSurveyValidation from './add-survey-validation-factory';

jest.mock('../../../../validation/validators/validation-composite');

describe('AddSurveyValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    ['question', 'answers'].forEach((field) => {
      validations.push(new RequiredFieldValidation(field));
    });
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
