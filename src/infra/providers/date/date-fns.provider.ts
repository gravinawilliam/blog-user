import { addMilliseconds, differenceInMilliseconds } from 'date-fns';

import { IDateExpiredValidator } from '@domain/validators/_shared/date.validator';

import { DateExpiredValidatorDTO } from '@dtos/providers/date/date-expired-validator.dto';

export class DateFnsProvider implements IDateExpiredValidator {
  expired({
    date,
    expiresAfterMilliseconds,
  }: DateExpiredValidatorDTO.Params): DateExpiredValidatorDTO.Result {
    const difference = differenceInMilliseconds(
      addMilliseconds(date, expiresAfterMilliseconds),
      new Date(),
    );
    return {
      expired: difference <= 0,
    };
  }
}
