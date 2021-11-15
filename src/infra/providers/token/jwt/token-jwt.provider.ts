import { sign, verify } from 'jsonwebtoken';

import { ITokenJwtGenerator } from '@domain/providers/token/jwt/token-jwt-generator.provider';
import { ITokenJwtVerify } from '@domain/providers/token/jwt/token-jwt-verify.provider';

import {
  IRequestTokenJwtVerify,
  IResponseTokenJwtVerify,
  ITokenJwtPayloadDTO,
} from '@dtos/providers/tokens/token-jwt-provider.dto';

import { authConfig } from '@main/config/auth.config';

import { UnauthorizedError } from '@shared/errors/unauthorized.error';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, right, left } from '@shared/utils/either';
import { unauthorized } from '@shared/utils/http-response';

export class TokenJwtProvider implements ITokenJwtGenerator, ITokenJwtVerify {
  public generate(userId: string): string {
    const { secret, expiresIn, algorithm, issuer } = authConfig.jwt;

    return sign({}, secret, {
      subject: userId,
      issuer,
      expiresIn,
      algorithm,
    });
  }

  public verify({
    authorization,
  }: IRequestTokenJwtVerify): Either<IHttpResponse, IResponseTokenJwtVerify> {
    try {
      const [, token] = authorization.split(' ');
      const decoded = verify(token, authConfig.jwt.secret);
      const { sub } = decoded as ITokenJwtPayloadDTO;
      return right({
        userId: sub,
      });
    } catch {
      return left(unauthorized(new UnauthorizedError('Invalid JWT token')));
    }
  }
}
