import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor, HandleExceptionFilter } from './common';

dotenv.config({
  path: '.env',
});

async function bootstrap() {
  const logger = new Logger('NestChat');
  const port = +process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    preflightContinue: false,
  });

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new HandleExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('NestChat')
    .addBearerAuth({
      name: 'authorization',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api/document', app, document);

  await app.listen(port, () =>
    logger.log(
      `Server running at port: ${port} on ${process.env.ENVIROMENT} environment`,
    ),
  );
}

bootstrap();
