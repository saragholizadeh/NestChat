import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards';
import { User } from 'src/database/models';
import { GetUser } from './decorators';

@ApiTags(`Auth`)
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return {
      data: await this.authService.register(registerDto),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return {
      data: await this.authService.login(loginDto),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/user')
  async getUser(@GetUser() user: User) {
    return {
      data: await this.authService.getUser(user),
    };
  }
}
