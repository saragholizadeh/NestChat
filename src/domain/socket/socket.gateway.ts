import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from '.';

@WebSocketGateway({ cors: '*' })
export class SocketGateway {
  @WebSocketServer()
  server: Socket;

  constructor(private readonly socketService: SocketService) {}

  private readonly connectedClients: Map<string, Socket> = new Map();
  async handleConnection(socket: Socket): Promise<void> {
    const headers = socket.handshake.headers;
    if (headers && headers.auth) {
    }
  }
}
