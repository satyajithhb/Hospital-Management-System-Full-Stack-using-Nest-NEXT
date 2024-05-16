import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import multer from 'multer';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'Hello',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3000000
      }
    })
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap();
