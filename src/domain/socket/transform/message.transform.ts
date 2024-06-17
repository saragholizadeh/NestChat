import { Transform } from 'src/common';
import { Message } from 'src/database';

export class MessageTransform extends Transform<Message> {
  transform(item: Message) {
    return {
      id: item.id,
      body: item.body,
      date: item.createdAt,
      time: item.createdAt,
    };
  }
}
