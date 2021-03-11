export default interface Decrypter {
  decrypt(value: string): Promise<string | null>,
}
