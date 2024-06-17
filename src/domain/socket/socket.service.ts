import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { ISendMessageArgs, IFindOtherUserIdArgs } from './interfaces';
import { MessageService } from '../message';
import { RoomUser } from 'src/database';
import { Op } from 'sequelize';
import { MessageTransform } from './transform';

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
    return otherUserId.userId;
  }

  async sendMessage(args: ISendMessageArgs): Promise<any> {
    const { message, roomId, userId, seen } = args;
    const insertMsg = await this.messageService.insert({
      body: message,
      recipientId: await this.findOtherUserId({
        roomId,
        userId,
      }),
      roomId,
      seen,
      senderId: userId,
    });

    return new MessageTransform().transform(insertMsg);
  }
}
