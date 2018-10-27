import { RoomActionTypes } from './room.actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch(action.type){
    case RoomActionTypes.GetAll:
      return action.payload; 
    default:
      return state;
  }
}

export default reducer;