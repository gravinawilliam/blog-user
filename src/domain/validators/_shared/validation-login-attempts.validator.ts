import { IRequestValidationLoginAttempts } from '@dtos/_shared/validation-login-attempts.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either } from '@shared/utils/either';

export interface IValidationLoginAttemptsValidator {
  execute(
    params: IRequestValidationLoginAttempts,
  ): Promise<Either<IHttpResponse, null>>;
}
