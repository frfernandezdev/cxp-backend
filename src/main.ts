import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import helmet from 'helmet';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('v1');

  await app.listen(3000);
}
bootstrap();
