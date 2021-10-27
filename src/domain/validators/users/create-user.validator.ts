import { ICreateUserDTO } from '@dtos/users/create-user.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateUserValidator {
  execute(param: ICreateUserDTO): Promise<Either<IHttpResponse, boolean>>;
}
