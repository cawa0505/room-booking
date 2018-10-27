import { RoomActionTypes } from './room.actionTypes';

export function getAllSuccess(rooms) {
  return {
    type: RoomActionTypes.GetAll,
    payload: rooms
  }
}

export function getAll(){
  return async (dispatch) => {
    const result = await fetch('/api/room');
    const rooms = await result.json();
    dispatch(getAllSuccess(rooms));
  }
}