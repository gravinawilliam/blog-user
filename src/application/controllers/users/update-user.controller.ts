import { IUpdateUserTransformer } from '@domain/transformers/users/update-user.transformer';
import { IUpdateUserUseCase } from '@domain/use-cases/users/update-user.usecase';
import { IUpdateUserValidator } from '@domain/validators/users/update-user.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserValidator: IUpdateUserValidator,
    private readonly updateUserTransformer: IUpdateUserTransformer,
    private readonly updateUserUseCase: IUpdateUserUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { authorization } = httpRequest.headers;
    const {
      email,
      name,
      current_password: currentPassword,
      new_password: newPassword,
    } = httpRequest.body;

    const validated = await this.updateUserValidator.execute({
      email,
      currentPassword,
      newPassword,
      authorization,
    });
    if (validated.isLeft()) return validated.value;
    const { currentUser } = validated.value;

    const transformed = await this.updateUserTransformer.execute({
      newPassword,
    });
    if (transformed.isLeft()) return transformed.value;
    const { newEncryptedPassword } = transformed.value;

    const userUpdated = await this.updateUserUseCase.execute({
      currentUser,
      email,
      name,
      newPassword: newEncryptedPassword,
    });

    return ok(userUpdated);
  }
}
