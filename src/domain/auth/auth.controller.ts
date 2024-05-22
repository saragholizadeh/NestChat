import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return {
      data: await this.authService.register(registerDto),
    };
  }

  @Post('/login')
  async login() {
    return {
      data: await this.authService.login(),
    };
  }
}
