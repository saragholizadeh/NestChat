import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from 'src/common';
import { IFindArgs, IInsertArgs, IUpdateArgs } from 'src/common';
import { Message } from 'src/database';
import { IInsertMessage } from './interfaces';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private messageRepository: typeof Message,
  ) {}

  findOne = (args: IFindArgs) => this.messageRepository.findOne(args);

  findAll = (args: IFindArgs) => this.messageRepository.findAll(args);

  update = (args: IUpdateArgs, values: Message) =>
    this.messageRepository.update({ ...values }, { ...args });

  insert = (message: IInsertMessage, args?: IInsertArgs) =>
    this.messageRepository.create({ ...message }, { ...args });

  destroy = (args: IFindArgs) => this.messageRepository.destroy(args);
}
