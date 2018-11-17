import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import Reservations from './components/Reservations';
import * as reservationActions from '../../ducks/reservations';

function mapStateToProps({ reservations }: IApplicationState) {
  return { reservations }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(reservationActions.getAll()),
    deleteOne: (item) => dispatch(reservationActions.deleteOne(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);
