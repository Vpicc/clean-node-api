import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from '../signup/signup-protocols';

export default class LoginController implements Controller {
  private readonly emailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;
    if (!email) {
      return badRequest(new MissingParamError('email'));
    }
    if (!password) {
      return badRequest(new MissingParamError('password'));
    }
    if (!this.emailValidator.isValid(email)) {
      return badRequest(new InvalidParamError('email'));
    }
    return {} as HttpResponse;
  }
}
