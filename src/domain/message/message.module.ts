import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { messageRepository } from 'src/database';

@Module({
  controllers: [MessageController],
  providers: [MessageService, ...messageRepository],
  exports: [MessageService],
})
export class MessageModule {}
