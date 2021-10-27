import { IResponseTransformerCreateUserDTO } from '@dtos/users/create-user-transformer-response.dto';
import { ITransformerCreateUserDTO } from '@dtos/users/create-user-transformer.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateUserTransformer {
  execute(
    data: ITransformerCreateUserDTO,
  ): Promise<Either<IHttpResponse, IResponseTransformerCreateUserDTO>>;
}
