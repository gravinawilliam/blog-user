import { IRequiredFieldsValidator } from '@domain/validators/_shared/required-fields.validator';
import { IRequestRequiredFieldsValidatorDTO } from '@dtos/_shared/request-required-fields.dto';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { RequiredParamError } from '@shared/errors/required-param.error';
import { badRequest } from '@shared/utils/http-response';

export class RequiredFieldsValidator implements IRequiredFieldsValidator {
  execute({
    fields,
    fieldNames,
  }: IRequestRequiredFieldsValidatorDTO): Either<IHttpResponse, boolean> {
    const errors: string[] = [];
    for (let index = 0; index < fields.length; index++) {
      if (fields[index] == null) {
        errors.push(fieldNames[index]);
      }
    }

    if (errors.length == 0) return right(true);

    return left(badRequest(new RequiredParamError(errors.join())));
  }
}
