import { ITokenJwtGenerator } from '@domain/providers/token/jwt/token-jwt-generator.provider';
import { IAuthenticateUserUseCase } from '@domain/use-cases/authentications/authenticate-user.usecase';

import { IAuthenticateUserUseCaseResponseDTO } from '@dtos/authentications/authenticate-user-usecase-response.dto';
import { IAuthenticateUserUseCaseDTO } from '@dtos/authentications/authenticate-user-usecase.dto';

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(private readonly token: ITokenJwtGenerator) {}

  public execute({
    userId,
  }: IAuthenticateUserUseCaseDTO): IAuthenticateUserUseCaseResponseDTO {
    const token = this.token.generate(userId);

    return {
      token,
    };
  }
}
