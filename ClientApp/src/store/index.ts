import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roomsReducer, { IRoom } from '../ducks/rooms';
import reservationsReducer, { IReservation } from '../ducks/reservations';
import singleRoomReducer from '../ducks/selectedRoom';
import menuReducer, { MenuSelect } from '../ducks/menu';
import authReducer, { IAuth } from '../ducks/auth';

export interface IApplicationState {
  readonly rooms: IRoom[];
  readonly reservations: IReservation[];
  readonly selectedRoom: IRoom;
  readonly menu: MenuSelect;
  readonly auth: IAuth;
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