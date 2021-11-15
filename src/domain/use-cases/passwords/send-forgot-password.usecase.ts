import { SendForgotPasswordUseCaseDTO } from '@dtos/passwords/send-forgot-password.dto';

export interface ISendForgotPasswordUseCase {
  execute(
    params: SendForgotPasswordUseCaseDTO.Params,
  ): Promise<SendForgotPasswordUseCaseDTO.Result>;
}
