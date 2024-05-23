import { Transform } from 'src/common/libs';
import { User } from 'src/database/models';

export class LoginTransform extends Transform<User> {
  transform(item: User) {
    return {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
    };
  }
}
