import { IAuthenticateUserUseCase } from '@domain/use-cases/authentications/authenticate-user.usecase';
import { IAuthenticateUserValidator } from '@domain/validators/authentications/authenticate-user.validator';

import { IAuthenticateUserResponseDTO } from '@dtos/authentications/authenticate-user-response.dto';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { ok } from '@shared/utils/http-response';

export class AuthenticateUserController implements IController {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
    private readonly authenticateUserValidator: IAuthenticateUserValidator,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = httpRequest.body;

    const userValidated = await this.authenticateUserValidator.execute({
      password,
      email,
    });

    if (userValidated.isLeft()) {
      const { body, statusCode } = userValidated.value;
      return {
        body,
        statusCode,
      };
    }

    const user = userValidated.value;

    const { token } = this.authenticateUserUseCase.execute({
      userId: user.id,
    });

    return ok({
      token,
      user,
    } as IAuthenticateUserResponseDTO);
  }
}
