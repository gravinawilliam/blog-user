import { validate } from 'secure-password-validator';
import blackList from 'secure-password-validator/build/main/blacklists/first10_000';

import { IPasswordValidator } from '@domain/validators/_shared/password.validator';

import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest } from '@shared/utils/http-response';

export class PasswordValidator implements IPasswordValidator {
  async validatePassword(
    password: string,
  ): Promise<Either<IHttpResponse, boolean>> {
    const options = {
      blackList,
    };
    const { errors, valid } = validate(password, options);
    if (valid === false) {
      return left(badRequest(new InvalidParamError(errors.join())));
    }
    return right(true);
  }
}
