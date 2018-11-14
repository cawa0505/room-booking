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
  Create = '[@reservation]: create',
  delete = '[@reservation]: delete',
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

export function createOneSuccess(item) {
  return {
    type: ReservationActionTypes.Create,
    payload: item
  }
}

export function deleteOneSuccess(item) {
  return {
    type: ReservationActionTypes.delete,
    payload: item
  }
}

export function create(item) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/reservation', item);
      const [id] = response.headers.location.split('/').slice(-1);
      const updatedItem = Object.assign({}, item, { id: parseInt(id, 10) });
      dispatch(createOneSuccess(updatedItem));
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function deleteOne(item) {
  return async (dispatch) => {
    try {
      await axios.delete('/api/reservation', item);
      dispatch(deleteOneSuccess(item));
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function getAll() {
  return async (dispatch) => {
    const { data } = await axios.get('/api/reservation');
    dispatch(getAllSuccess(data));
  }
}

export function reducer(state: IReservation[] = [], action: ReservationAction): IReservation[] {
  switch (action.type) {
    case ReservationActionTypes.GetAll:
      return action.payload;
    case ReservationActionTypes.Create:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default reducer;