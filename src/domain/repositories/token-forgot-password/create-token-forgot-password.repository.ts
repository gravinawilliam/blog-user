import { CreateTokenForgotPasswordRepositoryDTO } from '@dtos/token-forgot-password/tokens-forgot-password-repository.dto';

export interface ICreateTokenForgotPasswordRepository {
  create(
    params: CreateTokenForgotPasswordRepositoryDTO.Params,
  ): Promise<CreateTokenForgotPasswordRepositoryDTO.Result>;
}
