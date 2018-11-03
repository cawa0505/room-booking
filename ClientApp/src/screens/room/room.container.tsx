import { connect } from 'react-redux';
import { IApplicationState } from '../../store/configureStore';
import * as actions from './room.actions';
import RoomList from './components/RoomList';

function mapStateToProps({ rooms, selectedRoom }: IApplicationState) {
  return { rooms, selectedRoom }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(actions.getAll()),
    create: (newRoom) => dispatch(actions.create(newRoom)),
    selectRoom: (room) => dispatch(actions.selectRoom(room))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
