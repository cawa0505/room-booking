import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import RoomList from './components/RoomList';
import * as roomActions from '../../ducks/rooms';
import { selectRoom } from '../../ducks/selectedRoom';
import * as reservationActions from '../../ducks/reservations';

function mapStateToProps({ rooms, selectedRoom, auth }: IApplicationState) {
  return { rooms, selectedRoom, auth }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(roomActions.getAll()),
    selectRoom: (room) => dispatch(selectRoom(room)),
    makeReservation: (date) => dispatch(reservationActions.create(date)),
    deleteReservation: (reservation) => dispatch(reservationActions.deleteOne(reservation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
