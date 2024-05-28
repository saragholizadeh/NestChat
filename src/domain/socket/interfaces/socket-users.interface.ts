export interface ISocketUsers {
  userId: number;
  clientId: string;
  rooms: ISocketUsersRooms;
}

export interface ISocketUsersRooms {
  joinedRoom: null | number;
  activeRooms: number[];
}
