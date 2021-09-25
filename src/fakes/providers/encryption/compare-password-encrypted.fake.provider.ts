import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';

import { IComparePasswordEncryptedDTO } from '@dtos/providers/encryption/compare-password-encrypted.dto';

export class FakeComparePasswordEncrypted implements IComparePasswordEncrypted {
  async comparePassword({
    hashed,
    password,
  }: IComparePasswordEncryptedDTO): Promise<boolean> {
    return `${password}` === hashed;
  }
}
