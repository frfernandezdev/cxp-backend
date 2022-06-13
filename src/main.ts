import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import helmet from 'helmet';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('ConeXperto')
    .setDescription('ConeXperto - API Restful Docs')
    .setVersion('1.0.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/docs', app, document);

  await app.listen(3000);
}
bootstrap();
