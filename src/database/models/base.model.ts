import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Unique,
  Model,
} from 'sequelize-typescript';

export class BaseModel extends Model {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
}
