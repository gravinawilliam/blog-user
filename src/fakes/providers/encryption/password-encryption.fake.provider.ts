import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';

export class FakePasswordEncryption implements IPasswordEncryption {
  async encrypt(password: string): Promise<string> {
    return `${password}${Math.random()}`;
  }
}
