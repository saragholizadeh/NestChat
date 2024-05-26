import { MESSAGE_REPOSITORY } from 'src/common';
import { Message } from '../models';

export const messageRepository = [
  {
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
  },
];
