import { ActionTypes } from './room.actionTypes';
import { RoomAction } from './room.actions';
import { IRoom } from './room.interface';

export function reducer(state: IRoom[] = [], action: RoomAction): IRoom[] {
  switch (action.type) {
    case ActionTypes.GetAll:
      return action.payload;
    case ActionTypes.Create:
      return [...state, action.payload];
    default:
      return state;
  }
}

const initialRoomState: IRoom = {
  id: 0,
  location: "A000",
  floor: 0,
  size: 0,
  type: 0,
  reservations: []
}

export function singleRoomReducer(state: IRoom = initialRoomState, action: RoomAction): IRoom {
  switch (action.type) {
    case ActionTypes.SelectRoom:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;