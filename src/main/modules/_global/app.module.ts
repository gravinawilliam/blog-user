import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';

import { envConfig } from '@main/config/env.config';

import typeormConfig from '../../config/typeorm.config';
import { AuthenticationsModule } from '../authentications/authentications.module';
import { CreateUserModule } from '../users/users.module';

@Module({
  imports: [
    TerminusModule,
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
    AuthenticationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
