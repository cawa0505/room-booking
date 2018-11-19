export const enum MenuActionTypes {
  selectMenuItem = '[@menu] select menu item',
}

export const enum Screens {
  createRoom = 'createRoom',
  makeReservation = 'makeReservation',
  login = 'login',
  yourReservations = 'yourReservations'
}

type MenuSelect = Screens.createRoom | Screens.makeReservation | Screens.login | Screens.yourReservations;

export interface IMenuAction {
  type: MenuActionTypes.selectMenuItem,
  payload: MenuSelect
}

export function selectMenuItem(item: MenuSelect): IMenuAction {
  return {
    type: MenuActionTypes.selectMenuItem,
    payload: item
  }
}

export function reducer(state = Screens.makeReservation, action): MenuSelect {
  switch (action.type) {
    case MenuActionTypes.selectMenuItem:
      // TODO: Move outside of reducer
      sessionStorage.setItem('previousSelectedMenu', action.payload);
      return action.payload;
    default:
      return state;
  }
}

export default reducer;