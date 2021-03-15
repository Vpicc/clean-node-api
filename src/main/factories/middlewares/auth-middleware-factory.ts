import AuthMiddleware from '../../../presentation/middlewares/auth-middleware';
import { Middleware } from '../../../presentation/protocols';
import makeDbLoadAccountByToken from '../usecases/account/load-account-by-token/db-load-account-by-token-factory';

const makeAuthMiddleware = (role?: string): Middleware => {
  const loadAccountByToken = makeDbLoadAccountByToken();
  return new AuthMiddleware(loadAccountByToken, role);
};

export default makeAuthMiddleware;
