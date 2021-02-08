import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper';
import {
  Controller, EmailValidator, Authentication, HttpRequest, HttpResponse,
} from './login-protocols';

export default class LoginController implements Controller {
  private readonly emailValidator;

  private readonly authentication;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for (let i = 0; i < requiredFields.length; i += 1) {
        if (!httpRequest.body[requiredFields[i]]) {
          return badRequest(new MissingParamError(requiredFields[i]));
        }
      }
      const { email, password } = httpRequest.body;

      const isValidEmail = this.emailValidator.isValid(email);

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return unauthorized();
      }
      return {} as HttpResponse;
    } catch (error) {
      return serverError(error);
    }
  }
}
