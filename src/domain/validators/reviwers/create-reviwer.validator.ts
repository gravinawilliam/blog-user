import {
  IRequestCreateReviwerValidatorDTO,
  IResponseCreateReviwerValidatorDTO,
} from '@dtos/reviwers/create-reviwer.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface ICreateReviwerValidator {
  execute(
    params: IRequestCreateReviwerValidatorDTO,
  ): Promise<Either<IHttpResponse, IResponseCreateReviwerValidatorDTO>>;
}
