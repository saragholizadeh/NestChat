import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { DomainModule } from './domain';

@Module({
  imports: [DatabaseModule, DomainModule],
})
export class AppModule {}
