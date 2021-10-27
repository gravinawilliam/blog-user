import { IAuthConfig } from '@domain/configs/auth.config';

import { envConfig } from '@main/config/env.config';

const { jwt, tryLimit } = envConfig;

export const authConfig = {
  jwt,
  tryLimit,
  conditionsTimeAttempts: new Map([
    [5, 5],
    [8, 10],
    [12, 15],
  ]),
} as IAuthConfig;
