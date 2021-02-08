import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { InvalidParamError } from '../../errors';
import {
  Controller, EmailValidator, AddAccount, HttpRequest, HttpResponse, Validation,
} from './signup-protocols';

/* eslint-disable class-methods-use-this */
export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  private readonly validation: Validation;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
    this.validation = validation;
  }

  async handle(httpRequest : HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
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
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return ok(account);
    } catch (error) {
      console.error(error);
      return serverError(error);
    }
  }
}
