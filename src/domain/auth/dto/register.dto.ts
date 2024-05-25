import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
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
}
