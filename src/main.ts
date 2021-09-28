import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AllExceptionsFilter } from '@main/errors/all-exception.filter';

import envConfig from './main/config/env.config';
import { AppModule } from './main/modules/_global/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(envConfig.port || 3000, () => {
    if (envConfig.nodeEnv !== 'PROD') {
      Logger.log(`✅ OK ${envConfig.port || 3000}`);
    }
  });
}
bootstrap();
