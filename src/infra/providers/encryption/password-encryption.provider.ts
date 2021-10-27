import { hash } from 'bcryptjs';

import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';

export class PasswordEncryption implements IPasswordEncryption {
  async encrypt(password: string): Promise<string> {
    return hash(password, 10);
  }
}
