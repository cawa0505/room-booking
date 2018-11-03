import { ActionTypes } from './room.actionTypes';
import axios from 'axios';
import { IRoom } from './room.interface';

export interface IGetAll {
  type: ActionTypes.GetAll;
  payload: IRoom[]
}

export interface ICreate {
  type: ActionTypes.Create;
  payload: IRoom
}

export interface ISelectRoom {
  type: ActionTypes.SelectRoom;
  payload: IRoom
}

export type RoomAction = IGetAll | ICreate | ISelectRoom;

export function getAllSuccess(rooms: IRoom[]): IGetAll {
  return {
    type: ActionTypes.GetAll,
    payload: rooms
  }
}

export function createRoomSuccess(room) {
  return {
    type: ActionTypes.Create,
    payload: room
  }
}

export function selectRoom(room) {
  return {
    type: ActionTypes.SelectRoom,
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