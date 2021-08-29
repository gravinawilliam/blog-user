import 'dotenv/config';

const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.API_PORT || 3000,
  dataBaseDefault: {
    type: process.env.DB_DEFAULT_TYPE,
    host: process.env.DB_DEFAULT_HOST,
    port: parseInt(process.env.DB_DEFAULT_PORT),
    username: process.env.DB_DEFAULT_USERNAME,
    password: process.env.DB_DEFAULT_PASSWORD,
    database: process.env.DB_DEFAULT_DATABASE,
  },
};

export default envConfig;
