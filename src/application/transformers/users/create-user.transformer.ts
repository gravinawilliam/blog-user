import { IPasswordEncryption } from '@domain/providers/encryption/password-encryption.provider';
import { ICreateUserTransformer } from '@domain/transformers/users/create-user.transformer';

import { IResponseTransformerCreateUserDTO } from '@dtos/users/create-user-transformer-response.dto';
import { ITransformerCreateUserDTO } from '@dtos/users/create-user-transformer.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, right, left } from '@shared/utils/either';
import { badRequest } from '@shared/utils/http-response';

import { InvalidParamError } from '../../../shared/errors/invalid-param.error';

export class CreateUserTransformer implements ICreateUserTransformer {
  constructor(private readonly passwordEncryption: IPasswordEncryption) {}

  public async execute({
    password,
  }: ITransformerCreateUserDTO): Promise<
    Either<IHttpResponse, IResponseTransformerCreateUserDTO>
  > {
    const encryptedPassword = await this.passwordEncryption.encrypt(password);

    if (encryptedPassword === password) {
      return left(badRequest(new InvalidParamError('unencrypted password')));
    }

    return right({
      passwordTransformed: encryptedPassword,
    } as IResponseTransformerCreateUserDTO);
  }
}
