import env from '../../config/env';
import DbAuthentication from '../../../data/usecases/authentication/db-authentication';
import BcryptAdapter from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import JwtAdapter from '../../../infra/cryptography/jwt-adapter/jwt-adapter';
import AccountMongoRepository from '../../../infra/db/mongodb/account/account-mongo-repository';
import LogMongoRepository from '../../../infra/db/mongodb/log/log-mongo-repository';
import LoginController from '../../../presentation/controllers/login/login-controller';
import { Controller } from '../../../presentation/protocols';
import LogControllerDecorator from '../../decorators/log-controller-decorator';
import makeLoginValidation from './login-validation-factory';

const makeLoginController = (): Controller => {
  const salt = 12;
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
  const validationComposite = makeLoginValidation();
  const loginController = new LoginController(
    dbAuthentication,
    validationComposite,
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};

export default makeLoginController;
