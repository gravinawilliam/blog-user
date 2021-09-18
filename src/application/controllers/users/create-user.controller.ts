import { ICreateUserUsecase } from '@domain/use-cases/users/create-user.usecase';
import { ICreateUserValidator } from '@domain/validators/users/create-user.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response';

export class CreateUserController implements IController {
  constructor(
    private readonly createUserUseCase: ICreateUserUsecase,
    private readonly createUserValidator: ICreateUserValidator,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, name, password } = httpRequest.body;

    const userValidated = await this.createUserValidator.execute({
      email,
      password,
      name,
    });

    if (userValidated.isLeft()) {
      const { body, statusCode } = userValidated.value;
      return {
        body,
        statusCode,
      };
    }

    const account = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return created(account);
  }
}
