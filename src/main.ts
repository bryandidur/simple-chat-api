import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.select(AppModule).get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: 422,
  }));
  app.use(bodyParser.json({
    limit: '10mb',
  }));
  app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
  }));
  app.use(rateLimit({
    windowMs: 60000,
    max: 60,
  }));

  await app.listen(config.get<number>('app.port'));
}
bootstrap();
