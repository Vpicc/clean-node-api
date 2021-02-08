export default interface Authentication {
  async auth(email: string, password: string): Promise<string>,
}
