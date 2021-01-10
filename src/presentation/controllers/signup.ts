/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
export default class SignUpController {
  handle(httpRequest : any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name'),
    };
  }
}
