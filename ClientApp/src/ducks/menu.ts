export const enum MenuActionTypes {
  showMenu = '[@menu] show menu',
  hideMenu = '[@menu] hide menu'
}

export function showMenu() {
  return {
    type: MenuActionTypes.showMenu
  }
}

export function hideMenu() {
  return {
    type: MenuActionTypes.hideMenu
  }
}

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