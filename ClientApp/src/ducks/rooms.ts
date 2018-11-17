import axios from 'axios';
import { ReservationActionTypes } from './reservations';

export interface IRoom {
  id: number;
  location: string;
  floor: number;
  size: number;
  type: number;
  reservations: []
}

export const enum RoomActionTypes {
  GetAll = '[@rooms]: GetAll',
  Create = '[@rooms]: Create',
  SelectRoom = '[@rooms]: SelectRoom'
}

export interface IGetAll {
  type: RoomActionTypes.GetAll;
  payload: IRoom[]
}

export interface ICreate {
  type: RoomActionTypes.Create;
  payload: IRoom
}

export interface ISelectRoom {
  type: RoomActionTypes.SelectRoom;
  payload: IRoom
}

export type RoomAction = IGetAll | ICreate | ISelectRoom;

export function getAllSuccess(rooms: IRoom[]): IGetAll {
  return {
    type: RoomActionTypes.GetAll,
    payload: rooms
  }
}

export function createRoomSuccess(room) {
  return {
    type: RoomActionTypes.Create,
    payload: room
  }
}

export function selectRoom(room) {
  return {
    type: RoomActionTypes.SelectRoom,
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

export function reducer(state = [], action) {
  switch (action.type) {
    case RoomActionTypes.GetAll:
      return action.payload;
    case RoomActionTypes.Create:
      return [...state, action.payload];
    case ReservationActionTypes.Create:
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