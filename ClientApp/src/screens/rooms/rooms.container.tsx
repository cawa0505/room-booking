import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import RoomList from './components/RoomList';
import * as menuActions from '../../ducks/menu';
import * as roomActions from '../../ducks/rooms';
import * as reservationActions from '../../ducks/reservations';

function mapStateToProps({ rooms, selectedRoom, menu }: IApplicationState) {
  return { rooms, selectedRoom, menu }
}

function mapDispatchToProps(dispatch) {
  return {
    showMenu: () => dispatch(menuActions.showMenu()),
    hideMenu: () => dispatch(menuActions.hideMenu()),
    getAll: () => dispatch(roomActions.getAll()),
    create: (newRoom) => dispatch(roomActions.create(newRoom)),
    selectRoom: (room) => dispatch(roomActions.selectRoom(room)),
    makeReservation: (date) => dispatch(reservationActions.create(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
