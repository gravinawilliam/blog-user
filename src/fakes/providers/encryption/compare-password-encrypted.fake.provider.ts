import { IComparePasswordEncrypted } from '@domain/providers/encryption/compare-password-encrypted.provider';

import { IComparePasswordEncryptedDTO } from '@dtos/providers/encryption/compare-password-encrypted.dto';

export class FakeComparePasswordEncrypted implements IComparePasswordEncrypted {
  // ? I disabled the rule because here is an interface implementation
  // eslint-disable-next-line require-await
  async comparePassword({
    hashed,
    password,
  }: IComparePasswordEncryptedDTO): Promise<boolean> {
    return `${password}` === hashed;
  }
}
