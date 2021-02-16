import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from './db-authentication-protocols';

export default class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository;

  private readonly hashComparer;

  private readonly tokenGenerator;

  private readonly updateAccessTokenRepository;

  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
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

    const token = await this.tokenGenerator.generate(account.id);

    await this.updateAccessTokenRepository.update(account.id, token);

    return token;
  }
}
