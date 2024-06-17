import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService, ISocketUsers, IJoinedRooms, ISendMessage } from '.';
import { verifyToken } from './libs';
import { RoomService } from '../room';
import { RoomUser } from 'src/database';
import { JoinRoomDto } from './dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { IFindOtherUserIdArgs } from './interfaces';

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

  private checkUserHasJoined(args: IFindOtherUserIdArgs): boolean {
    return this.users.some(
      (user) =>
        user.userId == args.userId && user.rooms.joinedRoom == args.roomId,
    );
  }

  @UsePipes(new ValidationPipe())
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

        socket.on('join_room', async (data: JoinRoomDto) => {
          const userIndex = this.getUserIndex(user.id);
          const userRooms = this.users[userIndex].rooms;
          userRooms.joinedRoom = data.roomId;
          userRooms.activeRooms = this.users[
            userIndex
          ].rooms.activeRooms.filter((item) => item != data.roomId);

          socket.to(`${data.roomId}`).emit('joined_room', {
            roomId: data.roomId,
            message: 'Your friend joined the chat',
          });
        });

        socket.on('leave_room', async (data: IJoinedRooms) => {
          const userIndex = this.getUserIndex(user.id);
          const userRooms = this.users[userIndex].rooms;

          userRooms.joinedRoom = null;
          userRooms.activeRooms.push(data.roomId);

          socket.leave(`${data.roomId}`);
          socket.to(`${data.roomId}`).emit('left_room', {
            roomId: data.roomId,
            message: 'Your friend left the chat',
          });
        });

        socket.on('send_message', async (data: ISendMessage) => {
          const otherUserId = await this.socketService.findOtherUserId({
            roomId: data.roomId,
            userId: user.id,
          });

          const hasJoined = this.checkUserHasJoined({
            userId: otherUserId,
            roomId: data.roomId,
          });

          const sendMessage = await this.socketService.sendMessage({
            seen: !!hasJoined,
            roomId: data.roomId,
            userId: user.id,
            message: data.message,
          });

          /* emit to the recipient*/
          socket.to(`${data.roomId}`).emit('receive_msg', {
            ...sendMessage,
            self: false,
          });

          /* emit to the sender*/
          socket.emit('receive_msg', {
            ...sendMessage,
            self: true,
          });
        });

        socket.on('disconnect', () => {
          const userIndex = this.getUserIndex(user.id);
          if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
          }

          console.log('Client ' + clientId + ' disconnected');
          this.connectedClients.delete(clientId);
        });
      }
    }
  }
}
