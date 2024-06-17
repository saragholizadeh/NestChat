import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'You must add the message!' })
  message: string;

  @IsNumber()
  @IsNotEmpty({ message: 'You must add the roomId!' })
  roomId: number;
}
