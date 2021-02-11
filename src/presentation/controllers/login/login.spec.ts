/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidParamError, MissingParamError } from '../../errors';
import {
  badRequest, ok, serverError, unauthorized,
} from '../../helpers/http/http-helper';
import { HttpRequest, Authentication } from './login-protocols';
import LoginController from './login';
import { Validation } from '../signup/signup-protocols';
import { AuthenticationModel } from '../../../domain/usecases/authentication';

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationModel): Promise<string | null> {
      return 'any_token';
    }
  }
  return new AuthenticationStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

interface SutTypes {
  sut: LoginController,
  validationStub: Validation,
  authenticationStub: Authentication,
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication();
  const validationStub = makeValidation();
  const sut = new LoginController(authenticationStub, validationStub);
  return { sut, authenticationStub, validationStub };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'valid_email@mail.com',
    password: 'valid_password',
  },
});

describe('Login Controller', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(authSpy).toHaveBeenCalledWith({ email: 'valid_email@mail.com', password: 'valid_password' });
  });

  test('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null));
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(unauthorized());
  });

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((_resolve, reject) => {
      reject(new Error());
    }));
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token',
    }));
  });

  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });
});
