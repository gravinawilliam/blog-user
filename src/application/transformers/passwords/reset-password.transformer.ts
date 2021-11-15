import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';
import { IResetPasswordTransformer } from '@domain/transformers/passwords/reset-password.transformer';

import { ResetPasswordTransformerDTO } from '@dtos/passwords/reset-password.dto';

export class ResetPasswordTransformer implements IResetPasswordTransformer {
  constructor(private readonly passwordEncryption: IPasswordEncryption) {}

  public async execute({
    newPassword,
  }: ResetPasswordTransformerDTO.Params): Promise<ResetPasswordTransformerDTO.Result> {
    const encryptedPassword = await this.passwordEncryption.encrypt(
      newPassword,
    );
    return { passwordEncrypted: encryptedPassword };
  }
}
