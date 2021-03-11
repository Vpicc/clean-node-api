import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

export default class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    console.log(httpRequest);
    const error = forbidden(new AccessDeniedError());
    return Promise.resolve(error);
  }
}
