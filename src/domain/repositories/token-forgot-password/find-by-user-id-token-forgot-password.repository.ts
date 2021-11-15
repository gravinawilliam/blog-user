import { FindByUserIdTokenForgotPasswordRepositoryDTO } from '@dtos/token-forgot-password/tokens-forgot-password-repository.dto';

export interface IFindByUserIdTokenForgotPasswordRepository {
  findByUserId(
    params: FindByUserIdTokenForgotPasswordRepositoryDTO.Params,
  ): Promise<FindByUserIdTokenForgotPasswordRepositoryDTO.Result>;
}
