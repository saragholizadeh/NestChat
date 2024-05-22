import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { MessageModule } from './message';
import { RoomModule } from './room';
import { SocketModule } from './socket';
import { AuthModule } from './auth';

@Module({
  imports: [UserModule, MessageModule, RoomModule, SocketModule, AuthModule],
})
export class DomainModule {}
