import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import LoginController from './login';

interface SutTypes {
  sut: LoginController,
}

// const makeFakeAccount = () => ({
//   email: 'valid_email@mail.com',
//   password: 'valid_password',
// });

const makeSut = (): SutTypes => {
  const sut = new LoginController();
  return { sut };
};

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });
});
