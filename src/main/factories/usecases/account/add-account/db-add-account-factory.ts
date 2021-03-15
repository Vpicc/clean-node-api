import BcryptAdapter from '../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import AccountMongoRepository from '../../../../../infra/db/mongodb/account/account-mongo-repository';
import DbAddAccount from '../../../../../data/usecases/add-account/db-add-account';
import { AddAccount } from '../../../../../domain/usecases/add-account';

const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository,
  );

  return dbAddAccount;
};

export default makeDbAddAccount;
