import { Reducer } from 'redux';
import { RoomActionTypes } from './room.actionTypes';
import { IRoomState } from './room.interface';

const initialState: IRoomState = {
  rooms: [{ name: "Roomy"}]
}

const reducer: Reducer<IRoomState> = (state = initialState, action) => {
  switch(action.type){
    case RoomActionTypes.GET_ALL_ROOMS:
      return action.payload; 
    default:
      return state;
  }
}

export default reducer;