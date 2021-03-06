import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import Decrypter from '../../protocols/criptography/decrypter';
import LoadAccountByTokenRepository from '../../protocols/db/account/load-account-by-token-repository';
import { AccountModel } from '../add-account/db-add-account-protocols';

export default class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken);

    if (!token) {
      return null;
    }
    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role);
    return account;
  }
}
