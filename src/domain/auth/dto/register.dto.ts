import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    minLength: 4,
    maxLength: 25,
  })
  @Length(4, 25)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    minLength: 4,
    maxLength: 25,
  })
  @Length(4, 25)
  @IsString()
  @IsNotEmpty()
  lastName: string;

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
