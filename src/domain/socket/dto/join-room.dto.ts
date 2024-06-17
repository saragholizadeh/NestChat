import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinRoomDto {
  @IsNumber()
  @IsNotEmpty({ message: 'You must add the roomId!' })
  roomId: number;
}
