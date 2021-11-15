import { SendForgotPasswordValidatorDTO } from '@dtos/passwords/send-forgot-password.dto';

export interface ISendForgotPasswordValidator {
  execute(
    params: SendForgotPasswordValidatorDTO.Params,
  ): Promise<SendForgotPasswordValidatorDTO.Result>;
}
