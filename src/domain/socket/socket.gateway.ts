import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService, ISocketUsers } from '.';
import { verifyToken } from './libs';
import { RoomService } from '../room';
import { RoomUser } from 'src/database';

@WebSocketGateway({ cors: '*' })
export class SocketGateway {
  @WebSocketServer()
  server: Socket;

  constructor(
    private readonly socketService: SocketService,
    private readonly roomService: RoomService,
  ) {}

  private readonly connectedClients: Map<string, Socket> = new Map();

  private users: ISocketUsers[] = [];

  async handleConnection(socket: Socket): Promise<void> {
    if (socket.handshake.headers && socket.handshake.headers.auth) {
      const token: any = socket.handshake.headers.auth;
      const user: any = verifyToken(token);
      const clientId = socket.id;

      if (user) {
        const rooms = await this.roomService.userJoinedRooms(user.id);
        const activeRooms: number[] = [];

        rooms.forEach((room: RoomUser) => {
          activeRooms.push(room.roomId);
          socket.join(`${room.roomId}`);
        });

        this.users.push({
          userId: user.id,
          clientId,
          rooms: {
            joinedRoom: null,
            activeRooms,
          },
        });

        socket.on('join_room', async (data: any) => {
          console.log('hey');
        });
      }
    }
  }
}
