import { IDeleteUserValidatorResponseDTO } from '@dtos/users/delete-user-validator-response.dto';
import { IDeleteUserDTO } from '@dtos/users/delete-user.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface IDeleteUserValidator {
  execute(
    data: IDeleteUserDTO,
  ): Promise<Either<IHttpResponse, IDeleteUserValidatorResponseDTO>>;
}
