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
  describe('hash()', () => {
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

    test('should throw if hash throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()));
      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('compare()', () => {
    test('should call compare with correct values', async () => {
      const { sut } = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    test('should return true on compare success', async () => {
      const { sut } = makeSut();
      const result = await sut.compare('any_value', 'any_hash');
      expect(result).toBe(true);
    });

    test('should return false on compare failure', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false));
      const result = await sut.compare('any_value', 'any_hash');
      expect(result).toBe(false);
    });

    test('should throw if compare throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.reject(new Error()));
      const promise = sut.compare('any_value', 'any_hash');
      await expect(promise).rejects.toThrow();
    });
  });
});
