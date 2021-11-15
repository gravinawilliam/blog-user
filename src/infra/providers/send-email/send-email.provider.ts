import { IPostHttp } from '@domain/providers/http/post-http.provider';
import { ISendEmailProvider } from '@domain/providers/send-email/send-email.provider';

import { SendEmailProviderDTO } from '@dtos/providers/send-email/send-email-provider.dto';

import { envConfig } from '@main/config/env.config';

export class SendEmailProvider implements ISendEmailProvider {
  constructor(private readonly httpRequest: IPostHttp) {}

  async execute(params: SendEmailProviderDTO.Params): Promise<void> {
    await this.httpRequest.post({
      data: params,
      url: `${envConfig.url.internalMicroServices.notifications}/emails/send`,
    });
  }
}
