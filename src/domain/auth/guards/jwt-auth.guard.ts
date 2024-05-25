import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info)
      throw new HttpException(
        {
          success: false,
          message:
            info instanceof JsonWebTokenError
              ? 'Invalid token'
              : 'No authorization token was found',
          statusCode: 401,
        },
        401,
      );

    return super.handleRequest(err, user, info, context, status);
  }
}
