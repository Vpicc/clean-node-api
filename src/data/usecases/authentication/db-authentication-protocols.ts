import Authentication, { AuthenticationModel } from '../../../domain/usecases/authentication';
import { HashComparer } from '../../protocols/criptography/hash-comparer';
import TokenGenerator from '../../protocols/criptography/token-generator';
import LoadAccountByEmailRepository from '../../protocols/db/load-account-by-email-repository';
import UpdateAccessTokenRepository from '../../protocols/db/update-access-token-repository';

export {
  Authentication,
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
};
