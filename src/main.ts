import { AllExceptionsFilter } from '@main/errors/all-exception.filter';
import { NestFactory } from '@nestjs/core';
import envConfig from './main/config/env.config';
import { AppModule } from './main/modules/global/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(envConfig.port || 3000, () => {
    if (envConfig.nodeEnv !== 'PROD') {
      console.log(`✅ OK ${envConfig.port || 3000}`);
    }
  });
}
bootstrap();
