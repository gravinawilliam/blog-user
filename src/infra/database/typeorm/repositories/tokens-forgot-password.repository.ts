import { getRepository, Repository } from 'typeorm';

import { ICreateTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/create-token-forgot-password.repository';
import { IDeleteTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/delete-token-forgot-password.repository';
import { IFindByEmailTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/find-by-email-token-forgot-password.repository';
import { IFindByUserIdTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/find-by-user-id-token-forgot-password.repository';

import {
  CreateTokenForgotPasswordRepositoryDTO,
  DeleteTokenForgotPasswordRepositoryDTO,
  FindByEmailTokenForgotPasswordRepositoryDTO,
  FindByUserIdTokenForgotPasswordRepositoryDTO,
} from '@dtos/token-forgot-password/tokens-forgot-password-repository.dto';

import { left, right } from '@shared/utils/either';

import { TokenForgotPasswordEntity } from '../entities/token-forgot-password.entity';

export default class TokensForgotPasswordTypeormRepository
  implements
    ICreateTokenForgotPasswordRepository,
    IFindByUserIdTokenForgotPasswordRepository,
    IDeleteTokenForgotPasswordRepository,
    IFindByEmailTokenForgotPasswordRepository
{
  private ormRepository: Repository<TokenForgotPasswordEntity>;

  constructor() {
    this.ormRepository = getRepository(TokenForgotPasswordEntity);
  }

  async create(
    params: CreateTokenForgotPasswordRepositoryDTO.Params,
  ): Promise<void> {
    const created = this.ormRepository.create(params);
    await this.ormRepository.save(created);
  }

  async delete({
    tokenForgotPassword,
  }: DeleteTokenForgotPasswordRepositoryDTO.Params): Promise<void> {
    await this.ormRepository.remove(tokenForgotPassword);
  }

  async findByUserId({
    userId,
  }: FindByUserIdTokenForgotPasswordRepositoryDTO.Params): Promise<FindByUserIdTokenForgotPasswordRepositoryDTO.Result> {
    const found = await this.ormRepository.findOne({
      where: { userId },
    });
    if (found === undefined) return left(found as undefined);
    return right({
      tokenForgotPassword: found,
    });
  }

  async findByEmail({
    email,
  }: FindByEmailTokenForgotPasswordRepositoryDTO.Params): Promise<FindByEmailTokenForgotPasswordRepositoryDTO.Result> {
    const found = await this.ormRepository.findOne({
      where: { email },
    });
    if (found === undefined) return left(found as undefined);
    return right({
      tokenForgotPassword: found,
    });
  }
}
