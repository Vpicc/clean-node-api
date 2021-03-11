import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import Decrypter from '../../protocols/criptography/decrypter';
import { AccountModel } from '../add-account/db-add-account-protocols';

export default class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel | null> {
    console.log(role);
    await this.decrypter.decrypt(accessToken);
    return Promise.resolve(null);
  }
}
