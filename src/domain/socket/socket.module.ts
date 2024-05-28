import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { RoomModule } from '../room';

@Module({
  imports: [RoomModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
