import { ROOM_USER_REPOSITORY } from 'src/common';
import { RoomUser } from '../models';

export const roomUserepository = [
  {
    provide: ROOM_USER_REPOSITORY,
    useValue: RoomUser,
  },
];
