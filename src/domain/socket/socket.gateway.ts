import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from '.';
import { verifyToken } from './libs';

@WebSocketGateway({ cors: '*' })
export class SocketGateway {
  @WebSocketServer()
  server: Socket;

  constructor(private readonly socketService: SocketService) {}

  private readonly connectedClients: Map<string, Socket> = new Map();
  async handleConnection(socket: Socket): Promise<void> {
    if (socket.handshake.headers && socket.handshake.headers.auth) {
      const token: any = socket.handshake.headers.auth;
      const user: any = verifyToken(token);
      if (user) {
        const rooms = await this.socketService.userRooms(user.id);
        socket.on('join_room', async (data: any) => {
          console.log('hey');
        });
      }
    }
  }
}
