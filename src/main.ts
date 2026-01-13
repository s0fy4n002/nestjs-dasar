import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.SECRET_COOKIE || 'MY Secret Yans'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
