import {
  IRequestTokenJwtVerify,
  IResponseTokenJwtVerify,
} from '@dtos/providers/tokens/token-jwt-provider.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ITokenJwtVerify {
  verify(
    params: IRequestTokenJwtVerify,
  ): Either<IHttpResponse, IResponseTokenJwtVerify>;
}
