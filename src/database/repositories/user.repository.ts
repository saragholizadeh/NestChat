import { USER_REPOSITORY } from 'src/common/constants';
import { UserModel } from '../models';

export const userRepository = [
  {
    provide: USER_REPOSITORY,
    useValue: UserModel,
  },
];
