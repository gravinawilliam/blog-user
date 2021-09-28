import { sign } from 'jsonwebtoken';

import { ITokenJwtGenerator } from '@domain/providers/token-generator/token-jwt-generator.provider';

import authConfig from '@main/config/auth.config';

export class TokenJwtGenerator implements ITokenJwtGenerator {
  jwt(userId: string): string {
    const { secret, expiresIn, algorithm, issuer } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userId,
      issuer,
      expiresIn,
      algorithm,
    });

    return token;
  }
}
