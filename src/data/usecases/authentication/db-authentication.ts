import Authentication, { AuthenticationModel } from '../../../domain/usecases/authentication';
import { HashComparer } from '../../protocols/criptography/hash-comparer';
import LoadAccountByEmailRepository from '../../protocols/db/load-account-by-email-repository';

export default class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository;

  private readonly hashComparer;

  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);
    if (!account) {
      return null;
    }
    await this.hashComparer.compare(authentication.password, account.password);
    return null;
  }
}
