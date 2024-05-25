import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators';
import { User } from 'src/database/models';

@ApiTags(`User`)
@Controller({
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async userLists(@GetUser() user: User) {
    return {
      data: await this.userService.userList(user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/')
  async getUser(@GetUser() user: User) {
    return {
      data: await this.userService.getUser(user),
    };
  }
}
