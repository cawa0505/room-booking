import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { IRoom } from '../screens/room/room.interface';
import roomsReducer from '../screens/room/room.reducer';

export interface IApplicationState {
  readonly rooms: IRoom[]
}

const rootReducer = combineReducers({ 
  rooms: roomsReducer
});

const composeEnhancers = typeof window === 'object' 
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancers = composeEnhancers(applyMiddleware(thunk));

const store: any = createStore(rootReducer, {}, enhancers);

export default store;