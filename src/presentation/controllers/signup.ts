/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpRequest, HttpResponse } from '../protocols/http';

/* eslint-disable class-methods-use-this */
export default class SignUpController {
  handle(httpRequest : HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }
    return {
      statusCode: 500,
      body: new Error('Internal error'),
    };
  }
}
