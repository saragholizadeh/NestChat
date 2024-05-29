export interface IJoinedRooms {
  roomId: number;
}

export interface IFindOtherUserIdArgs extends IJoinedRooms {
  userId: number;
}

export interface ISendMessage {
  roomId: number;
  message: string;
}

export interface ISendMessageArgs extends ISendMessage {
  userId: number;
}
