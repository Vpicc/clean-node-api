export default interface UpdateAccessTokenRepository {
  update(id: string, token: string): Promise<void>,
}