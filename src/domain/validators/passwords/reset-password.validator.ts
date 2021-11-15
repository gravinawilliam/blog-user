import { ResetPasswordValidatorDTO } from '@dtos/passwords/reset-password.dto';

export interface IResetPasswordValidator {
  execute(
    params: ResetPasswordValidatorDTO.Params,
  ): Promise<ResetPasswordValidatorDTO.Result>;
}
