import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { RegisterDto, LoginDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(registerDto: RegisterDto) {
    await this.userService.insert({
      ...registerDto,
      password: await argon2.hash(registerDto.password),
    });
  }
  async login(_loginDto: LoginDto) {}

  async getUser() {}
}
