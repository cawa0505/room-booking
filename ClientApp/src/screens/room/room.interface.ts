export interface IRoom {
  id: number;
  name: string;
}

export interface IRoomState {
  readonly rooms: IRoom[]
}