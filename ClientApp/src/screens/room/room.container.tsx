import { connect } from 'react-redux';
import { IApplicationState } from '../../store/configureStore';
import * as actions from './room.actions';
import RoomList from './components/RoomList';

function mapStateToProps({ rooms }: IApplicationState){
  return { rooms }
}

function mapDispatchToProps(dispatch){
  return {
    getAll: () => dispatch(actions.getAll()),
    create: (newRoom) => dispatch(actions.create(newRoom))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
