import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Room, User } from '.';

@Table
export class Message extends BaseModel {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  seen: boolean;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  roomId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  senderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  recipientId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'senderId',
  })
  sender: User;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'recipientId',
  })
  recipient: User;

  @BelongsTo(() => Room, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'roomId',
  })
  room: Room;
}
