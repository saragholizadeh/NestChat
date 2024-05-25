import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { RegisterDto, LoginDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces';
import { UserTransform } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    let user = await this.userService.findOne({
      where: { username: registerDto.username },
    });

    if (user) {
      throw new BadRequestException('Duplicate Username');
    }

    const payload: IJwtPayload = { username: registerDto.username };
    const token = this.jwtService.sign(payload);

    user = await this.userService.insert({
      ...registerDto,
      password: await argon2.hash(registerDto.password),
    });

    return {
      ...new UserTransform().transform(user),
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne({
      where: { username: loginDto.username },
    });

    if (!user || !(await argon2.verify(user.password, loginDto.password))) {
      throw new BadRequestException('Username or password is wrong');
    }

    const payload: IJwtPayload = { username: loginDto.username };
    const token = this.jwtService.sign(payload);
    return {
      user: new UserTransform().transform(user),
      token,
    };
  }
}
