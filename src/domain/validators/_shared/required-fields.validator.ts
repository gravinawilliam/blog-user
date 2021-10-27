import { IRequestRequiredFieldsValidatorDTO } from '@dtos/_shared/request-required-fields.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface IRequiredFieldsValidator {
  execute(
    data: IRequestRequiredFieldsValidatorDTO,
  ): Either<IHttpResponse, boolean>;
}
