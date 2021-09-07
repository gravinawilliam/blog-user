import { IPasswordValidator } from '@domain/validators/_shared/password.validator';
import { InvalidParamError } from '@shared/errors/invalid-param.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { badRequest } from '@shared/utils/http-response';

export class FakePasswordValidator implements IPasswordValidator {
  async validatePassword(
    password: string,
  ): Promise<Either<IHttpResponse, boolean>> {
    if (password.length < 8) {
      return left(
        badRequest(
          new InvalidParamError('password must contain more than 8 characters'),
        ),
      );
    }
    return right(true);
  }
}
