import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { MessageModule } from './message';
import { RoomModule } from './room';
import { SocketModule } from './socket';

@Module({
  imports: [UserModule, MessageModule, RoomModule, SocketModule],
})
export class DomainModule {}
