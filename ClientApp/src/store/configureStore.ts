import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { IRoom } from '../screens/room/room.interface';
import { IReservation } from '../screens/reservation/reservation.interface';
import roomsReducer, { singleRoomReducer } from '../screens/room/room.reducer';
import reservationsReducer from '../screens/reservation/reservation.reducer';
import menuReducer from './menu/menu.reducer';
import authReducer from './../screens/auth/auth.reducer';

export interface IApplicationState {
  readonly rooms: IRoom[]
  readonly reservations: IReservation[]
  readonly selectedRoom: IRoom
  readonly menu
  readonly auth
}

const rootReducer = combineReducers({
  rooms: roomsReducer,
  reservations: reservationsReducer,
  selectedRoom: singleRoomReducer,
  menu: menuReducer,
  auth: authReducer
});

const composeEnhancers = typeof window === 'object'
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancers = composeEnhancers(applyMiddleware(thunk));

const store: any = createStore(rootReducer, {}, enhancers);

export default store;