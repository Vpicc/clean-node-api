import SignUpController from '../../../../../presentation/controllers/login/signup/signup-controller';
import { Controller } from '../../../../../presentation/protocols';
import makeLogControllerDecorator from '../../../decorators/log-controller-decorator-factory';
import makeDbAddAccount from '../../../usecases/account/add-account/db-add-account-factory';
import makeDbAuthentication from '../../../usecases/account/authentication/db-authentication-factory';
import makeSignupValidation from './signup-validation-factory';

const makeSignupController = (): Controller => {
  const dbAddAccount = makeDbAddAccount();
  const dbAuthentication = makeDbAuthentication();
  const validationComposite = makeSignupValidation();
  const signUpController = new SignUpController(
    dbAddAccount,
    validationComposite,
    dbAuthentication,
  );
  return makeLogControllerDecorator(signUpController);
};

export default makeSignupController;
