import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
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
  async login() {
    return {
      data: await this.authService.login(),
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
