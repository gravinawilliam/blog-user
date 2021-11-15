import { SendEmailProviderDTO } from '@dtos/providers/send-email/send-email-provider.dto';

export interface ISendEmailProvider {
  execute(
    params: SendEmailProviderDTO.Params,
  ): Promise<SendEmailProviderDTO.Result>;
}
