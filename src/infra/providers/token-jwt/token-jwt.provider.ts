import { sign, verify } from 'jsonwebtoken';

import { ITokenGenerator } from '@domain/providers/token/token-generator.provider';
import { ITokenVerify } from '@domain/providers/token/token-verify.provider';

import {
  IRequestTokenVerify,
  IResponseTokenVerify,
  ITokenPayloadDTO,
} from '@dtos/providers/tokens/tokens.dto';

import { authConfig } from '@main/config/auth.config';

import { IHttpResponse } from '@shared/interfaces/http-response.interface';
import { Either, right, left } from '@shared/utils/either';
import { unauthorized } from '@shared/utils/http-response';

import { UnauthorizedError } from '../../../shared/errors/unauthorized.error';

export class TokenJwt implements ITokenGenerator, ITokenVerify {
  public generate(userId: string): string {
    const { secret, expiresIn, algorithm, issuer } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userId,
      issuer,
      expiresIn,
      algorithm,
    });

    return token;
  }

  public verify({
    authorization,
  }: IRequestTokenVerify): Either<IHttpResponse, IResponseTokenVerify> {
    try {
      const [, token] = authorization.split(' ');
      const decoded = verify(token, authConfig.jwt.secret);
      const { sub } = decoded as ITokenPayloadDTO;
      return right({
        userId: sub,
      });
    } catch {
      return left(unauthorized(new UnauthorizedError('Invalid JWT token')));
    }
  }
}
