import { RoomActionTypes } from './room.actionTypes';

const initialState = [{ name: "Roomy"}];

const reducer = (state = initialState, action) => {
  switch(action.type){
    case RoomActionTypes.GET_ALL_ROOMS:
      return action.payload; 
    default:
      return state;
  }
}

export default reducer;