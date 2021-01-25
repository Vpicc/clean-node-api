import bcrypt from 'bcrypt';
import BcryptAdapter from './bcrypt-adapter';

interface SutTypes {
  sut: BcryptAdapter,
}
const makeSut = (salt : number) : SutTypes => {
  const sut = new BcryptAdapter(salt);
  return { sut };
};
describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const salt = 12;
    const { sut } = makeSut(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
