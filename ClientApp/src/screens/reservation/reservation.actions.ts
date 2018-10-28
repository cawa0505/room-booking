import { ActionTypes } from './reservation.actionTypes';
import axios from 'axios';
import { IReservation } from './reservation.interface';

export interface IGetAll {
  type: ActionTypes.GetAll;
  payload: IReservation[]
}

export interface ICreate {
  type: ActionTypes.Create;
  payload: IReservation
}

export type ReservationAction = IGetAll | ICreate;

export function getAllSuccess(items: IReservation[]): IGetAll {
  return {
    type: ActionTypes.GetAll,
    payload: items
  }
}

export function createOneSuccess(item){
  return {
    type: ActionTypes.Create,
    payload: item
  }
}

export function create(item){
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/reservation', item);
      dispatch({ type: '[@headers]', payload: response.headers });
      dispatch(createOneSuccess(item));
    } catch(error){
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function getAll(){
  return async (dispatch) => {
    const { data } = await axios.get('/api/reservation');
    dispatch(getAllSuccess(data));
  }
}