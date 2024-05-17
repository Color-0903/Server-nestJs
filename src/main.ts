import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transformer-interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import dataSource from './database/data-source';
import { setupSwagger } from './swagger';

async function bootstrap() {
  await dataSource.initialize();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  setupSwagger(app);

  // Global Interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  await app.listen(process.env.PORT || 3303);
}
bootstrap();
