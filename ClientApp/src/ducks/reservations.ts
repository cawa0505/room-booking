import axios from 'axios';

export interface IReservation {
  id: number;
  reservedBy: string;
  roomId: number;
  startTime: string;
  endTime: string;
  length: number;
}

export const enum ReservationActionTypes {
  getAll = '[@reservation]: get all',
  getOne = '[@reservation]: get one',
  create = '[@reservation]: create',
  deleteOne = '[@reservation]: delete',
}

export interface IgetAll {
  type: ReservationActionTypes.getAll;
  payload: IReservation[]
}

export interface ICreate {
  type: ReservationActionTypes.create;
  payload: IReservation
}

export type ReservationAction = IgetAll | ICreate;

export function getAllSuccess(items: IReservation[]): IgetAll {
  return {
    type: ReservationActionTypes.getAll,
    payload: items
  }
}

export function getOneSuccess(item) {
  return {
    type: ReservationActionTypes.getAll,
    payload: item
  }
}

export function createOneSuccess(item) {
  return {
    type: ReservationActionTypes.create,
    payload: item
  }
}

export function deleteOneSuccess(item) {
  return {
    type: ReservationActionTypes.deleteOne,
    payload: item
  }
}

export function create(item) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/reservation', item);
      const [id] = response.headers.location.split('/').slice(-1);
      const { data } = await axios.get(`/api/reservation/${id}`);
      dispatch(createOneSuccess(data));
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function deleteOne(item) {
  return async (dispatch) => {
    const result = await axios.delete(`/api/reservation/${item.id}`);
    dispatch({ type: '[@errors]', payload: result });
    dispatch(deleteOneSuccess(item));
  }
}

export function getAll() {
  return async (dispatch) => {
    const { data } = await axios.get('/api/reservation');
    dispatch(getAllSuccess(data));
  }
}

export function getOne(id) {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/reservation/${id}`);
    dispatch(getOneSuccess(data));
  }
}

export function reducer(state: IReservation[] = [], action): IReservation[] {
  switch (action.type) {
    case ReservationActionTypes.getAll:
      return action.payload;
    case ReservationActionTypes.create:
    case ReservationActionTypes.getOne:
      return [...state, action.payload];
    case ReservationActionTypes.deleteOne:
      return state.filter(reservation => reservation.id !== action.payload.id);
    default:
      return state;
  }
}

export default reducer;