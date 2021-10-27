import { IComparePasswordEncryptedDTO } from '@dtos/providers/encryption/compare-password-encrypted.dto';

export interface IComparePasswordEncrypted {
  comparePassword(data: IComparePasswordEncryptedDTO): Promise<boolean>;
}
