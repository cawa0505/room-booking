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
  logout = '[@auth] logout locally successful'
}

export interface IAuthAction {
  type: AuthActionTypes.login
  | AuthActionTypes.logout
  | AuthActionTypes.register
  payload?: IUserObject | string
}

export function loginSuccess(user: IUserObject): IAuthAction {
  return {
    type: AuthActionTypes.login,
    payload: user
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
      storeUser(user.email);
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

export function logout(): IAuthAction {
  sessionStorage.removeItem('jwtToken');
  sessionStorage.removeItem('user');
  return {
    type: AuthActionTypes.logout,
  }
}

export function storeToken(token: string): void {
  sessionStorage.setItem('jwtToken', token);
}

export function storeUser(user: string): void {
  sessionStorage.setItem('user', user);
}

export function reducer(state: IAuth = initialState.auth, action: IAuthAction): IAuth {
  switch (action.type) {
    case AuthActionTypes.login:
      return { loggedIn: true, user: action.payload };
    case AuthActionTypes.logout:
      return initialState.auth;
    default:
      return state;
  }
}

export default reducer;