import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';

import { envConfig } from '@main/config/env.config';

import typeormConfig from '../../config/typeorm.config';
import { AuthenticationsModule } from '../authentications/authentications.module';
import { PasswordsModule } from '../passwords/passwords.module';
import { CreateUserModule } from '../users/users.module';
import { HealthRoute } from './health.route';

@Module({
  imports: [
    TerminusModule,
    SentryModule.forRoot({
      dsn: envConfig.sentry.dsn,
      logLevel: LogLevel.Verbose,
      environment: envConfig.sentry.environment,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    CreateUserModule,
    AuthenticationsModule,
    PasswordsModule,
  ],
  controllers: [HealthRoute],
  providers: [],
})
export class AppModule {}
