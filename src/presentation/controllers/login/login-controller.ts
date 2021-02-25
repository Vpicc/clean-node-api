import {
  badRequest, ok, serverError, unauthorized,
} from '../../helpers/http/http-helper';
import {
  Controller, Authentication, HttpRequest, HttpResponse, Validation,
} from './login-controller-protocols';

export default class LoginController implements Controller {
  private readonly authentication;

  private readonly validation;

  constructor(authentication: Authentication, validation: Validation) {
    this.validation = validation;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email, password } = httpRequest.body;
      const accessToken = await this.authentication.auth({ email, password });
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
