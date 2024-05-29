export interface IJoinedRooms {
  roomId: number;
}

export interface ISendMessage {
  roomId: number;
  message: string;
}

export interface ISendMessageArgs extends ISendMessage {
  userId: number;
}
