import { NestFactory } from '@nestjs/core';
import envConfig from './main/config/env.config';
import { AppModule } from './main/modules/global/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envConfig.port || 3000, () => {
    if (envConfig.nodeEnv !== 'PROD') {
      console.log(`✅ OK ${envConfig.port || 3000}`);
    }
  });
}
bootstrap();
