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

export default reducer;