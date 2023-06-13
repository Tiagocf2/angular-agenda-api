import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import ValidationPipeConfiguration from './core/config/validation.config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('src/secrets/key.pem', 'utf8'),
      cert: fs.readFileSync('src/secrets/server.crt', 'utf8'),
    },
  });
  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfiguration));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
