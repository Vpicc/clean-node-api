import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from './db-authentication-protocols';

export default class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository;

  private readonly hashComparer;

  private readonly encrypter;

  private readonly updateAccessTokenRepository;

  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
    updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.encrypter = encrypter;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);

    if (!account) {
      return null;
    }

    const isValid = await this.hashComparer.compare(authentication.password, account.password);

    if (!isValid) {
      return null;
    }

    const token = await this.encrypter.encrypt(account.id);

    await this.updateAccessTokenRepository.update(account.id, token);

    return token;
  }
}