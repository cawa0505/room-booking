import axios from 'axios';
import initialState from '../store/initialState';

export interface IUserObject {
  email: string;
  password: string;
}

export interface IAuth {
  loggedIn: boolean;
  user: string | IUserObject;
}

export const enum AuthActionTypes {
  login = '[@auth] login successful',
  register = '[@auth] register successful',
  loginLocal = '[@auth] login locally successful',
  logoutLocal = '[@auth] logout locally successful'
}

export interface IAuthAction {
  type: AuthActionTypes.login
  | AuthActionTypes.loginLocal
  | AuthActionTypes.register
  | AuthActionTypes.logoutLocal,
  payload: IUserObject | string
}

export function loginSuccess(user: IUserObject): IAuthAction {
  return {
    type: AuthActionTypes.login,
    payload: user
  }
}

export function loginLocallySuccess(user: IUserObject): IAuthAction {
  return {
    type: AuthActionTypes.loginLocal,
    payload: user
  }
}

export function logoutLocallySuccess(): IAuthAction {
  return {
    type: AuthActionTypes.logoutLocal,
    payload: ''
  }
}

export function registerSuccess(user: string): IAuthAction {
  return {
    type: AuthActionTypes.register,
    payload: user
  }
}

export function login(user: IUserObject) {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/account/login', user);
      storeToken(result.data.token);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function register(user: IUserObject) {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/account/register', user);
      dispatch(registerSuccess(user.email));
      dispatch({ type: 'RESPONSE', payload: result });
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function storeToken(token: string): void {
  sessionStorage.setItem('jwtToken', token);
}

export function reducer(state: IAuth = initialState.auth, action: IAuthAction): IAuth {
  switch (action.type) {
    case AuthActionTypes.loginLocal:
      return { loggedIn: true, user: action.payload };
    case AuthActionTypes.logoutLocal:
      // TODO: move outside of reducer
      sessionStorage.removeItem('email');
      return initialState.auth;
    default:
      return state;
  }
}

export default reducer;