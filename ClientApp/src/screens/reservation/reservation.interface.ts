export interface IReservation {
  id: number;
  reservedBy: string;
  room: number;
  startTime: string;
  endTime: string;
  length: number;
}