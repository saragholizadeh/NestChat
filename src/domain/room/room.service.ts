import { Inject, Injectable } from '@nestjs/common';
import { ROOM_REPOSITORY, ROOM_USER_REPOSITORY } from 'src/common';
import { IFindArgs, IUpdateArgs, IInsertArgs } from 'src/common/interfaces';
import { RoomUser, Room, User } from 'src/database';
import { IUserInsert } from '../user';

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

  insert = (user: IUserInsert, args?: IInsertArgs) =>
    this.roomRepository.create({ ...user }, { ...args });

  destroy = (args: IFindArgs) => this.roomRepository.destroy(args);
}
