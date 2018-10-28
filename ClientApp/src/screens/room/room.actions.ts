import { RoomActionTypes } from './room.actionTypes';
import axios from 'axios';
import { IRoom } from './room.interface';

export interface IGetAll {
  type: RoomActionTypes.GetAll;
  payload: IRoom[]
}

export interface ICreate {
  type: RoomActionTypes.Create;
  payload: IRoom
}

export type RoomAction = IGetAll | ICreate;

export function getAllSuccess(rooms: IRoom[]): IGetAll {
  return {
    type: RoomActionTypes.GetAll,
    payload: rooms
  }
}

export function createRoomSuccess(room){
  return {
    type: RoomActionTypes.Create,
    payload: room
  }
}

export function create(room){
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/room', room);
      dispatch({ type: '[@headers]', payload: response.headers });
      dispatch(createRoomSuccess(room));
    } catch(error){
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function getAll(){
  return async (dispatch) => {
    const { data } = await axios.get('/api/room');
    dispatch(getAllSuccess(data));
  }
}