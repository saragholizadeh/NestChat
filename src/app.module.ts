import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { DomainModule } from './domain';
import { SocketModule } from './domain/socket';

@Module({
  imports: [DatabaseModule, DomainModule, SocketModule],
})
export class AppModule {}
