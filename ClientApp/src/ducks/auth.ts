import initialState from '../store/initialState';

export const enum AuthActionTypes {
  register = '[@auth] register successful',
  login = '[@auth] login successful'
}

export function loginSuccess(user) {
  return {
    type: '',
    payload: user
  }
}

export function registerSuccess(user) {
  return {
    type: '',
    payload: user
  }
}

export function reducer(state = initialState.auth, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;