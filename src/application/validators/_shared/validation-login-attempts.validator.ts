import {
  addMinutes,
  differenceInMilliseconds,
  differenceInMinutes,
} from 'date-fns';

import { ICreateSuccessUserAccessLogRepository } from '@domain/repositories/user-access-log/create-success-user-access-log.repository';
import { IFindByUserIdUserAccessLogRepository } from '@domain/repositories/user-access-log/find-by-user-id-user-access-log.repository';
import { IValidationLoginAttemptsValidator } from '@domain/validators/_shared/validation-login-attempts.validator';

import { IRequestValidationLoginAttempts } from '@dtos/_shared/validation-login-attempts.dto';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, right, left } from '@shared/utils/either';
import { unauthorized } from '@shared/utils/http-response';

import { UnauthorizedError } from '../../../shared/errors/unauthorized.error';

export class ValidationLoginAttemptsValidator
  implements IValidationLoginAttemptsValidator
{
  constructor(
    private readonly userAccessLogRepository: IFindByUserIdUserAccessLogRepository &
      ICreateSuccessUserAccessLogRepository,
  ) {}

  public async execute({
    conditionsTimeAttempts,
    userId,
    tryLimit,
  }: IRequestValidationLoginAttempts): Promise<Either<IHttpResponse, null>> {
    const logs = await this.userAccessLogRepository.findByUserId({
      authenticated: false,
      userId,
    });

    if (logs.length === 0) {
      return right(null);
    }

    if (logs.length === tryLimit) {
      this.userAccessLogRepository.createSuccess({
        userId,
      });
      return left(unauthorized(new UnauthorizedError('User bloked')));
    }

    // ? key é o tempo
    // ? value é o numero de tentativas
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of conditionsTimeAttempts) {
      if (logs.length === value) {
        if (key > differenceInMinutes(new Date(), logs[0].createdAt)) {
          return left(
            unauthorized(
              new UnauthorizedError(` ${differenceInMilliseconds(
                addMinutes(logs[0].createdAt, key),
                new Date(),
              )}
            `),
            ),
          );
        }
      }
    }

    return right(null);
  }
}
