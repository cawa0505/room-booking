import { MenuActionTypes } from './menu.actionTypes';

export function reducer(state = false, action) {
  switch (action.type) {
    case MenuActionTypes.showMenu:
      return true;
    case MenuActionTypes.hideMenu:
      return false;
    default:
      return state;
  }
}

export default reducer;