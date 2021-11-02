import 'dotenv/config';

export const envConfig = {
  url: {
    internalMicroServices: {
      dataReplication: process.env.URL_BASE_DATA_REPLICATION,
    },
  },
  nodeEnv: process.env.NODE_ENV,
  port: process.env.BLOG_USER_PORT,
  dataBaseDefault: {
    type: process.env.DB_DEFAULT_TYPE,
    host: process.env.DB_DEFAULT_HOST,
    port: parseInt(process.env.DB_DEFAULT_PORT, 10),
    username: process.env.DB_DEFAULT_USERNAME,
    password: process.env.DB_DEFAULT_PASSWORD,
    database: process.env.DB_DEFAULT_DATABASE,
  },
  sentry: {
    dsn: process.env.BLOG_USER_SENTRY_DSN,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM,
    issuer: process.env.JWT_ISSUER,
  },
  tryLimit: parseInt(process.env.VALIDATION_LOGIN_ATTEMPTS_TRY_LIMIT, 10),
};
