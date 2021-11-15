import { ISendForgotPasswordUseCase } from '@domain/use-cases/passwords/send-forgot-password.usecase';
import { ISendForgotPasswordValidator } from '@domain/validators/passwords/send-forgot-password.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class SendForgotPasswordController implements IController {
  constructor(
    private readonly sendForgotPasswordValidator: ISendForgotPasswordValidator,
    private readonly sendForgotPasswordUseCase: ISendForgotPasswordUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email } = httpRequest.body;

    const validated = await this.sendForgotPasswordValidator.execute({
      email,
    });
    if (validated.isLeft()) return validated.value;

    const { user } = validated.value;

    await this.sendForgotPasswordUseCase.execute({
      user,
    });

    return ok();
  }
}
