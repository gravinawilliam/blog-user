import { UpdateUserValidatorDTO } from '@dtos/users/update-user.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface IUpdateUserValidator {
  execute(
    params: UpdateUserValidatorDTO.Params,
  ): Promise<Either<IHttpResponse, UpdateUserValidatorDTO.Result>>;
}
