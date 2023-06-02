import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import ValidationPipeConfiguration from './validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfiguration));
  await app.listen(3000);
}
bootstrap();
