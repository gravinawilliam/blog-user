/* eslint-disable prettier/prettier */
import { ICreateUserTransformer } from '@domain/transformers/users/create-user.transformer';
import { ICreateUserUsecase } from '@domain/use-cases/users/create-user.usecase';
import { ICreateUserValidator } from '@domain/validators/users/create-user.validator';

import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { created } from '@shared/utils/http-response'

export class CreateUserController implements IController {
  constructor(
    private readonly createUserUseCase: ICreateUserUsecase,
    private readonly createUserValidator: ICreateUserValidator,
    private readonly createUserTransformer: ICreateUserTransformer,
  ) { }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, name, password } = httpRequest.body;

    const userValidated = await this.createUserValidator.execute({
      email,
      password,
      name,
    });

    if (userValidated.isLeft()) {
      return userValidated.value;
    }

    const userTransformed = await this.createUserTransformer.execute({
      password,
    });

    if (userTransformed.isLeft()) {
      return userTransformed.value;
    }

    const { passwordTransformed } = userTransformed.value;

    const createdUser = await this.createUserUseCase.execute({
      name,
      email,
      password: passwordTransformed
    });

    return created(createdUser);
  }
}
