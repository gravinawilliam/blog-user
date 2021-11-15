import { IAuthenticateUserUseCaseResponseDTO } from '@dtos/authentications/authenticate-user-usecase-response.dto';
import { IAuthenticateUserUseCaseDTO } from '@dtos/authentications/authenticate-user-usecase.dto';

export interface IAuthenticateUserUseCase {
  execute(
    data: IAuthenticateUserUseCaseDTO,
  ): IAuthenticateUserUseCaseResponseDTO;
}
