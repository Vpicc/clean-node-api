import validator from 'validator';
import EmailValidatorAdapter from './email-validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

interface SutTypes {
  sut: EmailValidatorAdapter,
}
const makeSut = () : SutTypes => {
  const sut = new EmailValidatorAdapter();
  return { sut };
};
describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const { sut } = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });

  test('should return true if validator returns true', () => {
    const { sut } = makeSut();
    const isValid = sut.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });

  test('should return true if validator returns true', () => {
    const { sut } = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('any_email@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
