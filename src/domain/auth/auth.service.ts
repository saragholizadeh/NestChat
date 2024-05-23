import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { RegisterDto, LoginDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userExist = await this.userService.findOne({
      where: { username: registerDto.username },
      attributes: ['id'],
    });

    if (userExist) {
      throw new BadRequestException('Duplicate Username');
    }

    const payload: IJwtPayload = { username: registerDto.username };
    const token = this.jwtService.sign(payload);

    await this.userService.insert({
      ...registerDto,
      password: await argon2.hash(registerDto.password),
    });

    return token;
  }

  async login(loginDto: LoginDto) {
    const userExist = await this.userService.findOne({
      where: { username: loginDto.username },
      attributes: ['password'],
    });

    if (
      !userExist ||
      !(await argon2.verify(userExist.password, loginDto.password))
    ) {
      throw new BadRequestException('Username or password is wrong');
    }

    const payload: IJwtPayload = { username: loginDto.username };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async getUser() {}
}
