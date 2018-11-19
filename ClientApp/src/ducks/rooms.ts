import axios from 'axios';
import { ReservationActionTypes, IReservation } from './reservations';

export interface IRoom {
  id: number;
  location: string;
  floor: number;
  size: number;
  type: number;
  reservations: IReservation[]
}

export const enum RoomActionTypes {
  getAll = '[@rooms]: getAll',
  create = '[@rooms]: create',
  SelectRoom = '[@rooms]: SelectRoom'
}

export interface ISelectRoom {
  type: RoomActionTypes.SelectRoom;
  payload: IRoom
}

export interface IRoomAction {
  type: RoomActionTypes.getAll | RoomActionTypes.create;
  payload: IRoom | IRoom[]
}

export function getAllSuccess(rooms: IRoom[]): IRoomAction {
  return {
    type: RoomActionTypes.getAll,
    payload: rooms
  }
}

export function createRoomSuccess(room: IRoom): IRoomAction {
  return {
    type: RoomActionTypes.create,
    payload: room
  }
}

export function create(room) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/room', room);
      const [id] = response.headers.location.split('/').slice(-1);
      const updatedRoom = Object.assign({}, room, { id: parseInt(id, 10), reservations: [] });
      dispatch(createRoomSuccess(updatedRoom));
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function getAll() {
  return async (dispatch) => {
    const { data } = await axios.get('/api/room');
    dispatch(getAllSuccess(data));
  }
}

export function reducer(state: IRoom[] = [], action) {
  switch (action.type) {
    case RoomActionTypes.getAll:
      return action.payload;
    case RoomActionTypes.create:
      return [...state, action.payload];
    case ReservationActionTypes.create:
      return state.map(room => room.id === action.payload.roomId
        ? Object.assign({}, room, { reservations: [...room.reservations, action.payload] })
        : room
      )
    case ReservationActionTypes.deleteOne:
      return state.map(room => room.id === action.payload.roomId ? room.reservations.filter(r => r.id !== action.payload.id) : room);
    default:
      return state;
  }
}

export default reducer;