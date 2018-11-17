import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roomsReducer from '../ducks/rooms';
import reservationsReducer from '../ducks/reservations';
import singleRoomReducer from '../ducks/selectedRoom';
import menuReducer from '../ducks/menu';
import authReducer from '../ducks/auth';

export interface IApplicationState {
  readonly rooms
  readonly reservations
  readonly selectedRoom
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