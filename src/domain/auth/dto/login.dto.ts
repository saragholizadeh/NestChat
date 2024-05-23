import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    minLength: 4,
    maxLength: 25,
  })
  @Length(4, 25)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    minLength: 8,
    maxLength: 30,
  })
  @Length(4, 25)
  @IsString()
  @IsNotEmpty()
  password: string;
}
