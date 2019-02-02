import { RoomActionTypes, IRoom } from './rooms';
import { ReservationActionTypes } from './reservations';
import initialState from '../store/initialState';

export interface IselectRoomAction {
  type: RoomActionTypes.selectRoom;
  payload: IRoom;
}

export function selectRoom(room: IRoom): IselectRoomAction {
  return {
    type: RoomActionTypes.selectRoom,
    payload: room
  }
}

function reducer(state = initialState.selectedRoom, action) {
  switch (action.type) {
    case RoomActionTypes.selectRoom:
      return action.payload;
    case ReservationActionTypes.create:
      return Object.assign({}, state, { reservations: [...state.reservations, action.payload] });
    default:
      return state;
  }
}

export default reducer;