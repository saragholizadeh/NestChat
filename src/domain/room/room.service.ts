import { Inject, Injectable } from '@nestjs/common';
import { ROOM_REPOSITORY, ROOM_USER_REPOSITORY } from 'src/common';
import { IFindArgs, IUpdateArgs, IInsertArgs } from 'src/common';
import { RoomUser, Room, User } from 'src/database';

@Injectable()
export class RoomService {
  constructor(
    @Inject(ROOM_REPOSITORY)
    private roomRepository: typeof Room,
    @Inject(ROOM_USER_REPOSITORY)
    private roomUserRepository: typeof RoomUser,
  ) {}

  findOne = (args: IFindArgs) => this.roomRepository.findOne(args);

  findAll = (args: IFindArgs) => this.roomRepository.findAll(args);

  update = (args: IUpdateArgs, values: User) =>
    this.roomRepository.update({ ...values }, { ...args });

  insert = (room: Room, args?: IInsertArgs) =>
    this.roomRepository.create({ ...room }, { ...args });

  destroy = (args: IFindArgs) => this.roomRepository.destroy(args);

  async userRooms(user: User) {}
}
