import bcrypt from 'bcrypt';
import Hasher from '../../data/protocols/criptography/hasher';

export default class BcryptAdapter implements Hasher {
  private readonly salt;

  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value:string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }
}
