type Algorithm =
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

const authConfig = {
  jwt: {
    secret:
      process.env.JWT_APP_SECRET !== undefined
        ? process.env.JWT_APP_SECRET
        : '123',
    expiresIn:
      process.env.JWT_EXPIRES_IN !== undefined
        ? process.env.JWT_EXPIRES_IN
        : '99d',
    algorithm:
      process.env.JWT_ALGORITHM !== undefined
        ? (process.env.JWT_ALGORITHM as Algorithm)
        : 'HS384',
    issuer:
      process.env.JWT_ISSUER !== undefined ? process.env.JWT_ISSUER : '123',
  },
};

export default authConfig;
