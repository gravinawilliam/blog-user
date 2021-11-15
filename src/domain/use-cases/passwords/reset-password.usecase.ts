import { ResetPasswordUseCaseDTO } from '@dtos/passwords/reset-password.dto';

export interface IResetPasswordUseCase {
  execute(
    params: ResetPasswordUseCaseDTO.Params,
  ): Promise<ResetPasswordUseCaseDTO.Result>;
}
