import { AuthActionTypes } from './auth.actionTypes';

const initialState = {
  auth: false,
  user: {
    id: 0,
    username: 'Steffe'
  }
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;