import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';
import { IUpdateUserTransformer } from '@domain/transformers/users/update-user.transformer';

import { UpdateUserTransformerDTO } from '@dtos/users/update-user.dto';

import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { left, right } from '@shared/utils/either';
import { badRequest } from '@shared/utils/http-response';

export class UpdateUserTransformer implements IUpdateUserTransformer {
  constructor(private readonly passwordEncryption: IPasswordEncryption) {}

  async execute({
    newPassword,
  }: UpdateUserTransformerDTO.Params): Promise<UpdateUserTransformerDTO.Result> {
    const encryptedPassword = await this.passwordEncryption.encrypt(
      newPassword,
    );
    if (encryptedPassword === newPassword) {
      return left(badRequest(new InvalidParamError('unencrypted password')));
    }
    return right({
      newEncryptedPassword: encryptedPassword,
    });
  }
}
