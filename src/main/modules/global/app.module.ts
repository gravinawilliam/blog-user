import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';

import envConfig from '@main/config/env.config';

import typeormConfig from '../../config/typeorm.config';
import { CreateUserRoute } from '../users/routes/create-user.route';
import { CreateUserModule } from '../users/users.module';

@Module({
  imports: [
    SentryModule.forRoot({
      debug: true,
      dsn: envConfig.sentry.dsn,
      logLevel: LogLevel.Debug,
      environment: 'development',
      tracesSampleRate: 1.0,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    CreateUserModule,
  ],
  controllers: [CreateUserRoute],
  providers: [],
})
export class AppModule {}
