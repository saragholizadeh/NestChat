import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ROOM_REPOSITORY, ROOM_USER_REPOSITORY } from 'src/common';
import { IFindArgs, IUpdateArgs, IInsertArgs } from 'src/common';
import { RoomUser, Room, User } from 'src/database';
import { UserJoinedRoomsTransform } from '.';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RoomService {
  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize,
    @Inject(ROOM_REPOSITORY)
    private roomRepository: typeof Room,
    @Inject(ROOM_USER_REPOSITORY)
    private roomUserRepository: typeof RoomUser,
  ) {}

  findOne = (args: IFindArgs) => this.roomRepository.findOne(args);

  findAll = (args: IFindArgs) => this.roomRepository.findAll(args);

  update = (args: IUpdateArgs, values: User) =>
    this.roomRepository.update({ ...values }, { ...args });

  insert = (args?: IInsertArgs) => this.roomRepository.create({}, { ...args });

  destroy = (args: IFindArgs) => this.roomRepository.destroy(args);

  async userRooms(user: User) {
    return user;
  }

  async userJoinedRooms(userId: number) {
    const rooms = await this.roomUserRepository.findAll({
      where: {
        userId,
      },
    });
    return new UserJoinedRoomsTransform().transformCollection(rooms);
  }

  async createRoom(user: User, otherUserId: number) {
    const commonRooms = await this.roomUserRepository.findAll({
      attributes: ['roomId'],
      where: {
        userId: {
          [Op.in]: [user.id, otherUserId],
        },
      },
      group: ['roomId'],
      having: this.sequelize.literal('COUNT (DISTINCT "userId") = 2'),
    });
    if (commonRooms.length == 0) {
      // BUG: sequelize
      // const transaction = await this.sequelize.transaction();
      try {
        const room = await this.insert({});
        await this.roomUserRepository.create(
          {
            userId: user.id,
            roomId: room.id,
          },
          // { transaction },
        );
        await this.roomUserRepository.create(
          {
            userId: otherUserId,
            roomId: room.id,
          },
          // { transaction },
        );
        // await transaction.commit();
        return {
          roomId: room.id,
        };
      } catch (e) {
        // await transaction.rollback();
        throw e;
      }
    }
    throw new BadRequestException('You have an active room with this user');
  }
}
