import { USER_REPOSITORY } from 'src/common/constants';
import { User } from '../models';

export const userRepository = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
