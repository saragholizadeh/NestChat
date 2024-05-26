import { Controller, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags(`Rooms`)
@Controller({
  path: 'rooms',
})
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
}
