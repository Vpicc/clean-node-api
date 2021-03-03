import LoginController from '../../../../presentation/controllers/login/login/login-controller';
import { Controller } from '../../../../presentation/protocols';
import makeLogControllerDecorator from '../../decorators/log-controller-decorator-factory';
import makeDbAuthentication from '../../usecases/authentication/db-authentication-factory';
import makeLoginValidation from './login-validation-factory';

const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication();
  const validationComposite = makeLoginValidation();
  const loginController = new LoginController(
    dbAuthentication,
    validationComposite,
  );
  return makeLogControllerDecorator(loginController);
};

export default makeLoginController;
