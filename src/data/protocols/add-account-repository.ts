import { AccountModel } from '../../domain/models/account';
import { AddAccountModel } from '../../domain/usecases/add-account';

export default interface AddAccountRepository {
  add(account: AddAccountModel): Promise<AccountModel>
}
