export const enum MenuActionTypes {
  selectMenuItem = '[@menu] select menu item',
}

export const enum Screens {
  createRoom = 'createRoom',
  makeReservation = 'makeReservation',
  login = 'login',
  yourReservations = 'yourReservations'
}

export function selectMenuItem(item) {
  return {
    type: MenuActionTypes.selectMenuItem,
    payload: item
  }
}

export function reducer(state = Screens.makeReservation, action) {
  switch (action.type) {
    case MenuActionTypes.selectMenuItem:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;