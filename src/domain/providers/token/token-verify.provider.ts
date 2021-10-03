import {
  IRequestTokenVerify,
  IResponseTokenVerify,
} from '@dtos/providers/tokens/tokens.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ITokenVerify {
  verify(
    params: IRequestTokenVerify,
  ): Either<IHttpResponse, IResponseTokenVerify>;
}
