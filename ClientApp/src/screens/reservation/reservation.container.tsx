import { connect } from 'react-redux';
import { IApplicationState } from '../../store/configureStore';
import * as actions from './reservation.actions';
import Reservations from './components/Reservations';

function mapStateToProps({ reservations }: IApplicationState){
  return { reservations }
}

function mapDispatchToProps(dispatch){
  return {
    getAll: () => dispatch(actions.getAll()),
    create: (newRoom) => dispatch(actions.create(newRoom))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);
