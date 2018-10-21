import { combineReducers, createStore, applyMiddleware, compose, Dispatch, Action, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { IRoomState } from '../screens/room/room.interface';
import roomsReducer from '../screens/room/room.reducer';

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export interface IApplicationState {
  readonly rooms: IRoomState
}

const rootReducer = combineReducers<IApplicationState>({ 
  rooms: roomsReducer
});

const composeEnhancers = typeof window === 'object' 
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancers = composeEnhancers(applyMiddleware(thunk));

const store: any = createStore(rootReducer, {}, enhancers);

export default store;