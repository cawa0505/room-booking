import { ActionTypes } from './reservation.actionTypes';
import { ReservationAction } from './reservation.actions';
import { IReservation } from './reservation.interface';

export function reducer(state: IReservation[] = [], action: ReservationAction): IReservation[] {
  switch(action.type){
    case ActionTypes.GetAll:
      return action.payload; 
    case ActionTypes.Create:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default reducer;