import { connect } from 'react-redux';
import { IApplicationState } from '../../store/configureStore';
import * as actions from './room.actions';
import RoomList from './components/RoomList';

function mapStateToProps({ rooms }: IApplicationState){
  return { rooms }
}

function mapDispatchToProps(dispatch){
  return {
    getAll: () => dispatch(actions.getAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
