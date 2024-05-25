import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/constants';
import { IFindArgs, IUpdateArgs, IInsertArgs } from 'src/common/interfaces';
import { User } from 'src/database';
import { IUserInsert } from './interfaces';
import { UserTransform } from './transforms';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}

  findOne = (args: IFindArgs) => this.userRepository.findOne(args);

  findAll = (args: IFindArgs) => this.userRepository.findAll(args);

  update = (args: IUpdateArgs, values: User) =>
    this.userRepository.update({ ...values }, { ...args });

  insert = (user: IUserInsert, args?: IInsertArgs) =>
    this.userRepository.create({ ...user }, { ...args });

  destroy = (args: IFindArgs) => this.userRepository.destroy(args);

  async getUser(user: User) {
    return new UserTransform().transform(user);
  }

  async userList(user: User) {
    console.log(user);

    const users = await this.findAll({
      where: {
        id: {
          [Op.not]: user.id,
        },
      },
      order: [['id', 'DESC']],
    });
    return new UserTransform().transformCollection(users);
  }
}
