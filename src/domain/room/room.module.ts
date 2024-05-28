import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { roomRepository, roomUserRepository } from 'src/database';
import { Sequelize } from 'sequelize-typescript';

@Module({
  controllers: [RoomController],
  providers: [
    {
      provide: 'SEQUELIZE',
      useValue: Sequelize,
    },
    RoomService,
    ...roomRepository,
    ...roomUserRepository,
  ],
  exports: [RoomService],
})
export class RoomModule {}
