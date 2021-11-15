import { ITokenJwtGenerator } from '@domain/providers/token/jwt/token-jwt-generator.provider';
import { ITokenJwtVerify } from '@domain/providers/token/jwt/token-jwt-verify.provider';

import {
  IRequestTokenJwtVerify,
  IResponseTokenJwtVerify,
} from '@dtos/providers/tokens/token-jwt-provider.dto';

import { UnauthorizedError } from '@shared/errors/unauthorized.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, left, right } from '@shared/utils/either';
import { unauthorized } from '@shared/utils/http-response';

export class FakeTokenJwt implements ITokenJwtGenerator, ITokenJwtVerify {
  verify({
    authorization,
  }: IRequestTokenJwtVerify): Either<IHttpResponse, IResponseTokenJwtVerify> {
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
