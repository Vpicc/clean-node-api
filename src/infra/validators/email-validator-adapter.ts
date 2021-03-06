/* eslint-disable class-methods-use-this */
import validator from 'validator';
import EmailValidator from '../../validation/protocols/email-validator';

export default class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string) : boolean {
    return validator.isEmail(email);
  }
}
