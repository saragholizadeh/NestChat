import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { ISendMessageArgs } from './interfaces';
import { MessageService } from '../message';

@Injectable()
export class SocketService {
  constructor(
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
  ) {}

  async sendMessage(args: ISendMessageArgs) {
    const message = await this.messageService.insert({
      body: args.message,
      recipientId: 44,
      roomId: args.roomId,
      seen: false,
      senderId: args.userId,
    });
    return message;
  }
}
