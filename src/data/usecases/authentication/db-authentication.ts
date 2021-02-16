import Authentication, { AuthenticationModel } from '../../../domain/usecases/authentication';
import LoadAccountByEmailRepository from '../../protocols/load-account-by-email-repository';

export default class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository;

  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(authentication.email);
    return null;
  }
}
