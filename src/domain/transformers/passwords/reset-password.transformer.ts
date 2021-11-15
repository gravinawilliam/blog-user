import { ResetPasswordTransformerDTO } from '@dtos/passwords/reset-password.dto';

export interface IResetPasswordTransformer {
  execute(
    params: ResetPasswordTransformerDTO.Params,
  ): Promise<ResetPasswordTransformerDTO.Result>;
}
