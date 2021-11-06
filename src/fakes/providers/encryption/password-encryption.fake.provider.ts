import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';

export class FakePasswordEncryption implements IPasswordEncryption {
  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async encrypt(password: string): Promise<string> {
    return `${password}123`;
  }
}
