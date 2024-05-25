import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response, Request, Router } from 'express';

@Catch(HttpException)
export class HandleExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (
      exception instanceof NotFoundException &&
      exception.message.includes('Cannot')
    ) {
      const path = exception.message.substring(exception.message.indexOf('/'));

      if (this.existsRoutePath(request, path))
        return response.status(HttpStatus.METHOD_NOT_ALLOWED).json({
          success: false,
          message: 'Method not allowed',
          statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        });

      return response.status(status).json({
        success: false,
        message: 'Sourse not found',
        statusCode: status,
      });
    }

    if (
      exception instanceof BadRequestException &&
      new RegExp(/(unexpected)(.*?)(json)/g).test(
        exception.message.toLowerCase(),
      )
    ) {
      return response.status(status).json({
        success: false,
        message: 'JSON not in Correct Format',
        statusCode: status,
      });
    }

    let message = 'Operation failed';
    if (
      exception.response?.message &&
      Array.isArray(exception.response.message)
    )
      message = exception.response.message[0];
    else if (exception.message) message = exception.message;

    response.status(status).json({
      success: false,
      message,
      statusCode: status,
    });
  }

  private existsRoutePath(request: Request, path: string) {
    let servicePath = path;
    if (path.includes('?')) servicePath = path.substring(0, path.indexOf('?'));

    try {
      const router = request.app._router as Router;
      const existPaths = router.stack
        .map((layer) => {
          if (layer.route) {
            const path = layer.route?.path;
            const method = layer.route?.stack[0].method;
            return { method: method.toUpperCase(), path };
          }
        })
        .filter((item) => item !== undefined)
        .filter((item) => item.path === servicePath);

      return existPaths.length > 0;
    } catch (e) {
      throw new Error('');
    }
  }
}
