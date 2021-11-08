import { ITokenGenerator } from '@domain/providers/token/token-generator.provider';
import { ITokenVerify } from '@domain/providers/token/token-verify.provider';

import {
  IRequestTokenVerify,
  IResponseTokenVerify,
} from '@dtos/providers/tokens/tokens.dto';

import { UnauthorizedError } from '@shared/errors/unauthorized.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { unauthorized } from '@shared/utils/http-response';

export class FakeTokenJwt implements ITokenGenerator, ITokenVerify {
  verify({
    authorization,
  }: IRequestTokenVerify): Either<IHttpResponse, IResponseTokenVerify> {
    const [, token] = authorization.split(' ');
    if (token === 'invalid') {
      return left(unauthorized(new UnauthorizedError('Invalid JWT token')));
    }
    return right({
      userId: token,
    });
  }

  generate(userId: string): string {
    return `Bearer ${userId}`;
  }
}
