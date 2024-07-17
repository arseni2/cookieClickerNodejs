import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import {AuthUserMiddleware} from "./user/middleware/auth-user/auth-user.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({credentials: true, origin: "*"})
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const config = new DocumentBuilder()
      .setTitle('API example')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
}
bootstrap();
