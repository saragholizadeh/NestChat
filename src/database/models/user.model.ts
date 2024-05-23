import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from '.';

@Table
export class User extends BaseModel {
  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
