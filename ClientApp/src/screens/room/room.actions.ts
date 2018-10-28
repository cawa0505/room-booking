import { RoomActionTypes } from './room.actionTypes';
import axios from 'axios';

export function getAllSuccess(rooms) {
  return {
    type: RoomActionTypes.GetAll,
    payload: rooms
  }
}

export function getAll(){
  return async (dispatch) => {
    const { data } = await axios.get('/api/room');
    dispatch(getAllSuccess(data));
  }
}