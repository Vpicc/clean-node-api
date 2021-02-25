import { AccountModel } from '../../../../domain/models/account';

export default interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel | null>
}
