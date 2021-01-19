/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import EmailValidator from '../presentation/protocols/email-validator';

export default class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string) : boolean {
    return false;
  }
}
