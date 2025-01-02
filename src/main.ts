import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SessionMiddleware } from './core/middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Use session middleware
    app.use(new SessionMiddleware().use);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
