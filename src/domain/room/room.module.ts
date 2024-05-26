import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { roomRepository } from 'src/database/repositories/room.repository';
import { roomUserRepository } from 'src/database/repositories/room-user.repository';

@Module({
  controllers: [RoomController],
  providers: [RoomService, ...roomRepository, ...roomUserRepository],
})
export class RoomModule {}
