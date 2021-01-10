import { badRequest, internalError } from '../helpers/http-helper';
import MissingParamError from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';

/* eslint-disable class-methods-use-this */
export default class SignUpController {
  handle(httpRequest : HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!httpRequest.body[requiredFields[i]]) {
        return badRequest(new MissingParamError(requiredFields[i]));
      }
    }
    return internalError(new Error('Internal server error'));
  }
}
