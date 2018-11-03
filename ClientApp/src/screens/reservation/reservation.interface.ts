export interface IReservation {
  id: number;
  reservedBy: string;
  roomId: number;
  startTime: string;
  endTime: string;
  length: number;
}