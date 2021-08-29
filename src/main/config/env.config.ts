import 'dotenv/config';

const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.API_PORT || 3000,
};

export default envConfig;
