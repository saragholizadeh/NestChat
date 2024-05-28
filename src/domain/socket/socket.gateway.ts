import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService, ISocketUsers, IJoinedRooms } from '.';
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

  private getUserIndex(userId: number) {
    const index = this.users
      .map((el) => {
        return el.userId;
      })
      .indexOf(userId);
    return index;
  }

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

        socket.on('join_room', async (data: IJoinedRooms) => {
          const userIndex = this.getUserIndex(user.id);
          const userRooms = this.users[userIndex].rooms;
          userRooms.joinedRoom = data.roomId;
          userRooms.activeRooms = this.users[
            userIndex
          ].rooms.activeRooms.filter((item) => item != data.roomId);

          socket.to(`${data.roomId}`).emit('joined_room', {
            roomId: data.roomId,
          });
        });

        socket.on('leave_room', async (data: IJoinedRooms) => {
          const userIndex = this.getUserIndex(user.id);
          const userRooms = this.users[userIndex].rooms;
          userRooms.joinedRoom = null;
          userRooms.activeRooms.push(data.roomId);
          socket.leave(`${data.roomId}`);
        });
      }
    }
  }
}
