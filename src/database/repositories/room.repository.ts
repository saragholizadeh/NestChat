import { ROOM_REPOSITORY } from 'src/common';
import { Room } from '../models';

export const roomRepository = [
  {
    provide: ROOM_REPOSITORY,
    useValue: Room,
  },
];
