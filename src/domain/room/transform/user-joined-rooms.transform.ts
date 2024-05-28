import { Transform } from 'src/common';
import { RoomUser } from 'src/database';

export class UserJoinedRoomsTransform extends Transform<RoomUser> {
  transform(item: RoomUser) {
    return {
      roomId: item.roomId,
    };
  }
}
