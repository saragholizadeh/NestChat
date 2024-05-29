import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { ISendMessageArgs, IFindOtherUserIdArgs } from './interfaces';
import { MessageService } from '../message';
import { Message, RoomUser } from 'src/database';
import { Op } from 'sequelize';

@Injectable()
export class SocketService {
  constructor(
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
  ) {}

  async findOtherUserId(args: IFindOtherUserIdArgs): Promise<number> {
    const room = await this.roomService.findAll({
      where: {
        id: args.roomId,
      },
      include: {
        model: RoomUser,
        as: 'roomUsers',
        where: {
          userId: {
            [Op.not]: args.userId,
          },
        },
      },
    });

    const otherUserId = room[0].roomUsers[0];
    console.log(otherUserId.userId);
    return otherUserId.userId;
  }

  async sendMessage(args: ISendMessageArgs): Promise<Message> {
    const message = await this.messageService.insert({
      body: args.message,
      recipientId: await this.findOtherUserId({
        roomId: args.roomId,
        userId: args.userId,
      }),
      roomId: args.roomId,
      seen: false,
      senderId: args.userId,
    });
    return message;
  }
}
