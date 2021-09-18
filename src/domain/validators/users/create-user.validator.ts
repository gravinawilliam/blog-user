import { ICreateUserDTO } from '@domain/dtos/users/create-user.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateUserValidator {
  execute(createOwner: ICreateUserDTO): Promise<Either<IHttpResponse, boolean>>;
}
