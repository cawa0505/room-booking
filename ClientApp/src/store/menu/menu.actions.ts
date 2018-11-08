import { MenuActionTypes } from './menu.actionTypes';

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