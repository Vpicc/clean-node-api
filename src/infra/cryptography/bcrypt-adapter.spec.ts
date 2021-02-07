import bcrypt from 'bcrypt';
import BcryptAdapter from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash() : Promise<string> {
    return Promise.resolve('hashed_value');
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
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12);
  });
  test('should return a hash on success', async () => {
    const { sut } = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hashed_value');
  });

  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.encrypt('any_value');
    await expect(promise).rejects.toThrow();
  });
});