import { badRequest, ok, serverError } from '../../helpers/http/http-helper';
import {
  Controller, AddAccount, HttpRequest, HttpResponse, Validation,
} from './signup-controller-protocols';

/* eslint-disable class-methods-use-this */
export default class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest : HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const {
        name, email, password,
      } = httpRequest.body;

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
