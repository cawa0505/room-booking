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
  GetAll = '[@reservation]: get all',
  getOne = '[@reservation]: get one',
  Create = '[@reservation]: create',
  deleteOne = '[@reservation]: delete',
}

export interface IGetAll {
  type: ReservationActionTypes.GetAll;
  payload: IReservation[]
}

export interface ICreate {
  type: ReservationActionTypes.Create;
  payload: IReservation
}

export type ReservationAction = IGetAll | ICreate;

export function getAllSuccess(items: IReservation[]): IGetAll {
  return {
    type: ReservationActionTypes.GetAll,
    payload: items
  }
}

export function getOneSuccess(item) {
  return {
    type: ReservationActionTypes.GetAll,
    payload: item
  }
}

export function createOneSuccess(item) {
  return {
    type: ReservationActionTypes.Create,
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
    case ReservationActionTypes.GetAll:
      return action.payload;
    case ReservationActionTypes.Create:
    case ReservationActionTypes.getOne:
      return [...state, action.payload];
    case ReservationActionTypes.deleteOne:
      return state.filter(reservation => reservation.id !== action.payload.id);
    default:
      return state;
  }
}

export default reducer;