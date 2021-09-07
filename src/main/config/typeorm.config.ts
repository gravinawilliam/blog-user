import { ConnectionOptions } from 'typeorm';
import envConfig from './env.config';

const { dataBaseDefault, nodeEnv } = envConfig;

const dir = nodeEnv === 'TEST' ? 'src' : 'dist/src';
const extension = nodeEnv === 'TEST' ? 'ts' : 'js';

const typeormConfig: ConnectionOptions = {
  name: 'default',
  type: dataBaseDefault.type,
  host: dataBaseDefault.host,
  port: dataBaseDefault.port,
  username: dataBaseDefault.username,
  password: dataBaseDefault.password,
  database: dataBaseDefault.database,
  entities: [`./${dir}/infra/database/typeorm/entities/*.${extension}`],
  migrations: [`./${dir}/infra/database/typeorm/migrations/*.${extension}`],
  synchronize: false,
  cli: {
    migrationsDir: `./${dir}/infra/database/typeorm/migrations/`,
  },
} as ConnectionOptions;

export default typeormConfig;
