import { IDeleteUserUseCase } from '@domain/use-cases/users/delete-user.usecase';
import { IDeleteUserValidator } from '@domain/validators/users/delete-user.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { deleted } from '@shared/utils/http-response';

export class DeleteUserController implements IController {
  constructor(
    private readonly deleteUserUseCase: IDeleteUserUseCase,
    private readonly deleteUserValidator: IDeleteUserValidator,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { password } = httpRequest.body;
    const { user_id } = httpRequest.params;

    const userValidated = await this.deleteUserValidator.execute({
      password,
      userId: user_id,
    });

    if (userValidated.isLeft()) {
      const { body, statusCode } = userValidated.value;
      return {
        body,
        statusCode,
      };
    }

    await this.deleteUserUseCase.execute({
      id: userValidated.value.id,
    });

    return deleted(true);
  }
}
