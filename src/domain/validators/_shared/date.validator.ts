import { DateExpiredValidatorDTO } from '@dtos/providers/date/date-expired-validator.dto';

export interface IDateExpiredValidator {
  expired(
    params: DateExpiredValidatorDTO.Params,
  ): DateExpiredValidatorDTO.Result;
}
