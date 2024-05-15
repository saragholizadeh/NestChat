import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common';
import * as dotenv from 'dotenv';
import {NestExpressApplication} from "@nestjs/platform-express";

dotenv.config({
  path: '.env',
});

async function bootstrap() {
  const logger = new Logger('NestChat');
  const port = +process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port, () => logger.log(`Server running at port: ${port} on ${process.env.ENVIROMENT} environment`));
}

bootstrap();
