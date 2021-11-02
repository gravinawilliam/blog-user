import { IAuthenticateUserUseCaseResponseDTO } from '@dtos/authentications/authenticate-user-usecase-response.dto';
import { IAuthenticateUserUseCaseDTO } from '@dtos/authentications/authenticate-user-usecase.dto';

export interface IAuthenticateUserUsecase {
  execute(
    data: IAuthenticateUserUseCaseDTO,
  ): IAuthenticateUserUseCaseResponseDTO;
}
