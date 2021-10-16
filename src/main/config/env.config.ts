import 'dotenv/config';

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.API_PORT || 3000,
  dataBaseDefault: {
    type: process.env.DB_DEFAULT_TYPE,
    host: process.env.DB_DEFAULT_HOST,
    port: parseInt(process.env.DB_DEFAULT_PORT, 10),
    username: process.env.DB_DEFAULT_USERNAME,
    password: process.env.DB_DEFAULT_PASSWORD,
    database: process.env.DB_DEFAULT_DATABASE,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  sonar: {
    login: process.env.SONAR_LOGIN,
    password: process.env.SONAR_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_APP_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM,
    issuer: process.env.JWT_ISSUER,
  },
  tryLimit: parseInt(process.env.VALIDATION_LOGIN_ATTEMPTS_TRY_LIMIT, 10),
};
