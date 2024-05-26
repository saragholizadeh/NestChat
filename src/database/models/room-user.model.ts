import { BaseModel, Room, User } from '.';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
@Table
export class RoomUser extends BaseModel {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  roomId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'userId',
    as: 'user',
  })
  user: User;

  @BelongsTo(() => Room, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'roomId',
    as: 'room',
  })
  room: Room;
}
