import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/constants';
import { IFindArgs, IUpdateArgs, IInsertArgs } from 'src/common/interfaces';
import { UserModel } from 'src/database/models';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof UserModel,
  ) {}

  findOne = (args: IFindArgs) => this.userRepository.findOne(args);

  findAll = (args: IFindArgs) => this.userRepository.findAll(args);

  update = (args: IUpdateArgs, values: UserModel) =>
    this.userRepository.update({ ...values }, { ...args });

  insert = (args: IInsertArgs, user: UserModel) =>
    this.userRepository.create({ ...user }, { ...args });

  destroy = (args: IFindArgs) => this.userRepository.destroy(args);
}
