import { ActionTypes } from './room.actionTypes';
import { RoomAction } from './room.actions';
import { ActionTypes as ReservationActionTypes } from '../reservation/reservation.actionTypes';
import { ReservationAction } from '../reservation/reservation.actions';
import { IRoom } from './room.interface';

type Actions = RoomAction | ReservationAction;

export function reducer(state: IRoom[] = [], action: Actions): IRoom[] {
  switch (action.type) {
    case ActionTypes.GetAll:
      return action.payload;
    case ActionTypes.Create:
      return [...state, action.payload];
    case ReservationActionTypes.Create:
      return state.map(room => room.id === action.payload.roomId
        ? Object.assign({}, room, { reservations: [...room.reservations, action.payload] })
        : room
      )
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

export function singleRoomReducer(state: IRoom = initialRoomState, action: Actions): IRoom {
  switch (action.type) {
    case ActionTypes.SelectRoom:
      return action.payload;
    case ReservationActionTypes.Create:
      return Object.assign({}, state, { reservations: [...state.reservations, action.payload] });
    default:
      return state;
  }
}

export default reducer;