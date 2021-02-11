export interface AuthenticationModel {
  email: string,
  password: string,
}

export default interface Authentication {
  auth(authentication: AuthenticationModel): Promise<string | null>,
}
