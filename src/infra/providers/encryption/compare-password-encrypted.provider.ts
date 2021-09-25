import { compare } from 'bcryptjs';

import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';

import { IComparePasswordEncryptedDTO } from '@dtos/providers/encryption/compare-password-encrypted.dto';

export class ComparePasswordEncrypted implements IComparePasswordEncrypted {
  async comparePassword({
    hashed,
    password,
  }: IComparePasswordEncryptedDTO): Promise<boolean> {
    return compare(password, hashed);
  }
}
