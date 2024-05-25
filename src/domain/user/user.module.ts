import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userRepository } from 'src/database/repositories';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userRepository],
  exports: [UserService],
})
export class UserModule {}
