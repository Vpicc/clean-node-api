import { AccountModel } from '../../../../domain/models/account';

export default interface LoadAccountByTokenRepository {
  loadByToken(token: string, role?: string): Promise<AccountModel | null>
}
