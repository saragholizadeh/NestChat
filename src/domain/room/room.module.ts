import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { roomRepository, roomUserRepository } from 'src/database';
@Module({
  controllers: [RoomController],
  providers: [RoomService, ...roomRepository, ...roomUserRepository],
})
export class RoomModule {}
