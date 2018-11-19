import axios from 'axios';
import initialState from '../store/initialState';

export interface IAuth {
  loggedIn: boolean;
  user: string;
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
  payload: IAuth | string
}

export function loginSuccess(authObject): IAuthAction {
  return {
    type: AuthActionTypes.login,
    payload: authObject
  }
}

export function loginLocallySuccess(email: string): IAuthAction {
  return {
    type: AuthActionTypes.loginLocal,
    payload: email
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

export function login(authObject) {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/account/login', authObject);
      storeToken(result.data.token);
      dispatch(loginSuccess({ loggedIn: true, user: { email: authObject.email } }));
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function register(authObject) {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/account/register', authObject);
      dispatch(registerSuccess(authObject.email));
      dispatch({ type: 'RESPONSE', payload: result });
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function storeToken(token: string): void {
  sessionStorage.setItem('jwtToken', token);
}

export function reducer(state: IAuth = initialState.auth, action): IAuth {
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