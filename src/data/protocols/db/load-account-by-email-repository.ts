import { AccountModel } from '../../../domain/models/account';

export default interface LoadAccountByEmailRepository {
  load(_email: string): Promise<AccountModel | null>
}
