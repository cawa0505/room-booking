export const enum MenuActionTypes {
  selectMenuItem = '[@menu] select menu item',
}

export const enum Screens {
  createRoom = '[@screen] create room',
  makeReservation = '[@screen] make reservation',
  login = '[@screen] login',
  yourReservations = '[@screen] your reservations'
}

export type MenuSelect = Screens.createRoom | Screens.makeReservation | Screens.login | Screens.yourReservations;

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

export function reducer(state: MenuSelect = Screens.makeReservation, action: IMenuAction): MenuSelect {
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