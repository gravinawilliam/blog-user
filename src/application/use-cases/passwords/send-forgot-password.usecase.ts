import { ISendEmailProvider } from '@domain/providers/send-email/send-email.provider';
import { IGenerateTokenCodeProvider } from '@domain/providers/token/code/token-code-generator.provider';
import { ICreateTokenForgotPasswordRepository } from '@domain/repositories/token-forgot-password/create-token-forgot-password.repository';
import { ISendForgotPasswordUseCase } from '@domain/use-cases/passwords/send-forgot-password.usecase';

import { SendForgotPasswordUseCaseDTO } from '@dtos/passwords/send-forgot-password.dto';

export class SendForgotPasswordUseCase implements ISendForgotPasswordUseCase {
  constructor(
    private readonly generateTokenProvider: IGenerateTokenCodeProvider,
    private readonly sendEmailProvider: ISendEmailProvider,
    private readonly tokensForgotPassword: ICreateTokenForgotPasswordRepository,
  ) {}

  async execute({
    user: { email, name, id: userId },
  }: SendForgotPasswordUseCaseDTO.Params): Promise<void> {
    const { token } = this.generateTokenProvider.generateCode();
    await this.sendEmailProvider.execute({
      emailUser: email,
      typeEmail: 'forgot-password',
      variables: {
        token,
        name,
      },
    });
    await this.tokensForgotPassword.create({
      token,
      email,
      userId,
    });
  }
}
