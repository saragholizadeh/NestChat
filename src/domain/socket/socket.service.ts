import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';

@Injectable()
export class SocketService {
  constructor(private readonly roomService: RoomService) {}
  async userRooms(id: number) {}
}
