import { RoomActionTypes } from './room.actionTypes';
import { RoomAction } from './room.actions';
import { IRoom } from './room.interface';

export function reducer(state: IRoom[] = [], action: RoomAction): IRoom[] {
  switch(action.type){
    case RoomActionTypes.GetAll:
      return action.payload; 
    default:
      return state;
  }
}

export default reducer;