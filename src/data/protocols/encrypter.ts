export default interface Encrypter {
  encrypt(_value: string): Promise<string>,
}
