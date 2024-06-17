import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { RoomModule } from '../room';
import { MessageModule } from '../message';

@Module({
  imports: [RoomModule, MessageModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
