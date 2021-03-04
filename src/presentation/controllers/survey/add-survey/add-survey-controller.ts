import {
  Controller, HttpRequest, HttpResponse, Validation,
} from './add-survey-controller-protocols';

export default class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body);
    return Promise.resolve({} as HttpResponse);
  }
}
