import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { envConfig } from './env.config';

const { dataBaseDefault, nodeEnv } = envConfig;

const dir =
  // eslint-disable-next-line no-nested-ternary
  nodeEnv === 'TEST' ? 'src' : nodeEnv === 'PROD' ? 'dist' : 'dist/src';
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
    migrationsDir: `./src/infra/database/typeorm/migrations/`,
  },
  namingStrategy: new SnakeNamingStrategy(),
} as ConnectionOptions;

export default typeormConfig;
