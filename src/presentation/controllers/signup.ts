import { badRequest, serverError } from '../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../errors';
import {
  Controller, EmailValidator, HttpRequest, HttpResponse,
} from '../protocols';
import { AddAccount } from '../../domain/usecases/add-account';

/* eslint-disable class-methods-use-this */
export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest : HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (let i = 0; i < requiredFields.length; i += 1) {
        if (!httpRequest.body[requiredFields[i]]) {
          return badRequest(new MissingParamError(requiredFields[i]));
        }
      }
      const {
        name, email, password, passwordConfirmation,
      } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const emailIsValid = this.emailValidator.isValid(email);
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'));
      }
      this.addAccount.add({
        name,
        email,
        password,
      });
      return serverError();
    } catch (error) {
      return serverError();
    }
  }
}
