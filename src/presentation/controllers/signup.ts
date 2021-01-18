import { badRequest, serverError } from '../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../errors';
import {
  Controller, EmailValidator, HttpRequest, HttpResponse,
} from '../protocols';

/* eslint-disable class-methods-use-this */
export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest : HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (let i = 0; i < requiredFields.length; i += 1) {
        if (!httpRequest.body[requiredFields[i]]) {
          return badRequest(new MissingParamError(requiredFields[i]));
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'));
      }
      return serverError();
    } catch (error) {
      return serverError();
    }
  }
}
