import jwt from 'jsonwebtoken';
import JwtAdapter from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign() : Promise<string> {
    return Promise.resolve('any_token');
  },
  async verify() : Promise<string> {
    return Promise.resolve('any_value');
  },
}));

interface SutTypes {
  sut: JwtAdapter,
}
const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret');
  return { sut };
};

describe('JwtAdapter', () => {
  describe('sign()', () => {
    test('should call sign with correct values', async () => {
      const { sut } = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    test('should return a token on sign success', async () => {
      const { sut } = makeSut();
      const accessToken = await sut.encrypt('any_id');
      expect(accessToken).toBe('any_token');
    });

    test('should throw if sign throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => Promise.reject(new Error()));
      const promise = sut.encrypt('any_id');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('verify()', () => {
    test('should call verify with correct values', async () => {
      const { sut } = makeSut();
      const signSpy = jest.spyOn(jwt, 'verify');
      await sut.decrypt('any_token');
      expect(signSpy).toHaveBeenCalledWith('any_token', 'secret');
    });

    test('should return a value on verify success', async () => {
      const { sut } = makeSut();
      const accessToken = await sut.decrypt('any_token');
      expect(accessToken).toBe('any_value');
    });
  });
});
