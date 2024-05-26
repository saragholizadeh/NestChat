import { BaseModel, RoomUser } from '.';
import { BelongsToMany, HasMany, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Room extends BaseModel {
  @BelongsToMany(() => User, {
    through: { model: () => RoomUser },
  })
  users: User[];

  @HasMany(() => RoomUser, 'roomId')
  roomUsers: RoomUser[];
}
