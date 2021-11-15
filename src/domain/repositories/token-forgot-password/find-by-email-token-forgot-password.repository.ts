import { FindByEmailTokenForgotPasswordRepositoryDTO } from '@dtos/token-forgot-password/tokens-forgot-password-repository.dto';

export interface IFindByEmailTokenForgotPasswordRepository {
  findByEmail(
    params: FindByEmailTokenForgotPasswordRepositoryDTO.Params,
  ): Promise<FindByEmailTokenForgotPasswordRepositoryDTO.Result>;
}
