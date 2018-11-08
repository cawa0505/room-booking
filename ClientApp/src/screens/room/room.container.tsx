import { connect } from 'react-redux';
import { IApplicationState } from '../../store/configureStore';
import * as actions from './room.actions';
import * as reservationActions from '../reservation/reservation.actions';
import * as menuActions from '../../store/menu/menu.actions';
import RoomList from './components/RoomList';

function mapStateToProps({ rooms, selectedRoom, menu }: IApplicationState) {
  return { rooms, selectedRoom, menu }
}

function mapDispatchToProps(dispatch) {
  return {
    showMenu: () => dispatch(menuActions.showMenu()),
    hideMenu: () => dispatch(menuActions.hideMenu()),
    getAll: () => dispatch(actions.getAll()),
    create: (newRoom) => dispatch(actions.create(newRoom)),
    selectRoom: (room) => dispatch(actions.selectRoom(room)),
    makeReservation: (date) => dispatch(reservationActions.create(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
