import { RoomActionTypes } from './rooms';
import { ReservationActionTypes } from './reservations';
import initialState from '../store/initialState';

export function selectRoom(room) {
  return {
    type: RoomActionTypes.SelectRoom,
    payload: room
  }
}

function reducer(state = initialState.selectedRoom, action) {
  switch (action.type) {
    case RoomActionTypes.SelectRoom:
      return action.payload;
    case ReservationActionTypes.create:
      return Object.assign({}, state, { reservations: [...state.reservations, action.payload] });
    default:
      return state;
  }
}

export default reducer;