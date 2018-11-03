import { connect } from 'react-redux';
import { IApplicationState } from '../../store/configureStore';
import * as actions from './room.actions';
import * as reservationActions from '../reservation/reservation.actions';
import RoomList from './components/RoomList';

function mapStateToProps({ rooms, selectedRoom }: IApplicationState) {
  return { rooms, selectedRoom }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(actions.getAll()),
    create: (newRoom) => dispatch(actions.create(newRoom)),
    selectRoom: (room) => dispatch(actions.selectRoom(room)),
    makeReservation: (date) => dispatch(reservationActions.create(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
