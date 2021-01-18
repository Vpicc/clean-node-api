import { badRequest, serverError } from '../helpers/http-helper';
import MissingParamError from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import Controller from '../protocols/controller';
import EmailValidator from '../protocols/email-validator';
import InvalidParamError from '../errors/invalid-param-error';
import ServerError from '../errors/server-error';

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
      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'));
      }
      return serverError(new Error('Internal server error'));
    } catch (error) {
      return serverError(new ServerError());
    }
  }
}
