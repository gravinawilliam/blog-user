import { DeleteTokenForgotPasswordRepositoryDTO } from '@dtos/token-forgot-password/tokens-forgot-password-repository.dto';

export interface IDeleteTokenForgotPasswordRepository {
  delete(
    params: DeleteTokenForgotPasswordRepositoryDTO.Params,
  ): Promise<DeleteTokenForgotPasswordRepositoryDTO.Result>;
}
