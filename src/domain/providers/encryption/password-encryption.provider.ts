export interface IPasswordEncryption {
  encrypt(password: string): Promise<string>;
}
