import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards';

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

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return {
      data: await this.authService.login(loginDto),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/user')
  async getUser() {
    return {
      data: await this.authService.getUser(),
    };
  }
}
