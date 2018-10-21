import { IRoom } from './room.interface';
import { RoomActionTypes } from './room.actionTypes';

export function getAllRooms(rooms?: IRoom[]) {
  return {
    type: RoomActionTypes.GET_ALL_ROOMS
  }
}