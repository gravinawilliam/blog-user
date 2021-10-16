type IAlgorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';

type IJWTConfig = {
  secret: string;
  expiresIn: string;
  algorithm: IAlgorithm;
  issuer: string;
};

export type IAuthConfig = {
  jwt: IJWTConfig;
  conditionsTimeAttempts: Map<number, number>;
  tryLimit: number;
};
