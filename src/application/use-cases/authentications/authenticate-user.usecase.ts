import { ITokenJwtGenerator } from '@domain/providers/token-generator/token-jwt-generator.provider';
import { IAuthenticateUserUsecase } from '@domain/use-cases/authentications/authenticate-user.usecase';

import { IAuthenticateUserUseCaseResponseDTO } from '@dtos/authentications/authenticate-user-usecase-response.dto';
import { IAuthenticateUserUseCaseDTO } from '@dtos/authentications/authenticate-user-usecase.dto';

export class AuthenticateUserUsecase implements IAuthenticateUserUsecase {
  constructor(private readonly tokenGenerator: ITokenJwtGenerator) {}

  public async execute({
    userId,
  }: IAuthenticateUserUseCaseDTO): Promise<IAuthenticateUserUseCaseResponseDTO> {
    const token = this.tokenGenerator.jwt(userId);

    return {
      token,
    };
  }
}
