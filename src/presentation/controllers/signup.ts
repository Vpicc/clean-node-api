/* eslint-disable @typescript-eslint/no-unused-vars */

import { badRequest, internalError } from '../helpers/http-helper';
import MissingParamError from '../protocols/errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';

/* eslint-disable class-methods-use-this */
export default class SignUpController {
  handle(httpRequest : HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }
    return internalError(new Error('Internal server error'));
  }
}
