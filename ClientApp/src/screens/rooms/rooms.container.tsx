import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import RoomList from './components/RoomList';
import { IRoom, getAll } from '../../ducks/rooms';
import { selectRoom } from '../../ducks/selectedRoom';
import { create, deleteOne, IReservation } from '../../ducks/reservations';

function mapStateToProps({ rooms, selectedRoom, auth }: IApplicationState) {
  return { rooms, selectedRoom, auth }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(getAll()),
    selectRoom: (room: IRoom) => dispatch(selectRoom(room)),
    makeReservation: (reservation: IReservation) => dispatch(create(reservation)),
    deleteReservation: (reservation: IReservation) => dispatch(deleteOne(reservation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
