import { IResetPasswordTransformer } from '@domain/transformers/passwords/reset-password.transformer';
import { IResetPasswordUseCase } from '@domain/use-cases/passwords/reset-password.usecase';
import { IResetPasswordValidator } from '@domain/validators/passwords/reset-password.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class ResetPasswordController implements IController {
  constructor(
    private readonly resetPasswordValidator: IResetPasswordValidator,
    private readonly resetPasswordTransformer: IResetPasswordTransformer,
    private readonly resetPasswordUseCase: IResetPasswordUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { new_password: newPassword, token, email } = httpRequest.body;

    const validated = await this.resetPasswordValidator.execute({
      email,
      newPassword,
      token,
    });
    if (validated.isLeft()) return validated.value;

    const { user } = validated.value;

    const { passwordEncrypted } = await this.resetPasswordTransformer.execute({
      newPassword,
    });

    await this.resetPasswordUseCase.execute({
      user,
      passwordEncrypted,
    });

    return ok();
  }
}
