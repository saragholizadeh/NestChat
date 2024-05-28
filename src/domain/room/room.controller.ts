import {
  Controller,
  Get,
  Post,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '../auth';
import { User } from 'src/database';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags(`Rooms`)
@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/user/rooms')
  async userRooms(@GetUser() user: User) {
    return {
      data: await this.roomService.userRooms(user),
    };
  }

  @Post('/createRoom')
  async createRoom(
    @GetUser() user: User,
    @Query('userId', ParseIntPipe) otherUserId: number,
  ) {
    return {
      data: await this.roomService.createRoom(user, otherUserId),
    };
  }
}
