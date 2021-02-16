import bcrypt from 'bcrypt';
import BcryptAdapter from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash() : Promise<string> {
    return Promise.resolve('hashed_value');
  },
  async compare() : Promise<boolean> {
    return Promise.resolve(true);
  },
}));
interface SutTypes {
  sut: BcryptAdapter,
}
const makeSut = () : SutTypes => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);
  return { sut };
};
describe('Bcrypt Adapter', () => {
  test('should call hash with correct value', async () => {
    const { sut } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12);
  });

  test('should return a valid hash on hash success', async () => {
    const { sut } = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hashed_value');
  });

  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.hash('any_value');
    await expect(promise).rejects.toThrow();
  });

  test('should call compare with correct values', async () => {
    const { sut } = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });
});
