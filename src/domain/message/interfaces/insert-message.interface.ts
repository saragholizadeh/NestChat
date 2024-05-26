export interface IInsertMessage {
  body: string;
  seen: boolean;
  roomId: number;
  senderId: number;
  recipientId: number;
}
