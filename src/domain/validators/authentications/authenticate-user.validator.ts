import { IAuthenticateUserValidatorResponseDTO } from '@dtos/authentications/authenticate-user-validator-response.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

import { IAuthenticateUserDTO } from '../../dtos/authentications/authenticate-user.dto';

export interface IAuthenticateUserValidator {
  execute(
    data: IAuthenticateUserDTO,
  ): Promise<Either<IHttpResponse, IAuthenticateUserValidatorResponseDTO>>;
}
