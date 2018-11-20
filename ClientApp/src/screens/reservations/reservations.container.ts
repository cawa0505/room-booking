import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import Reservations from './components/Reservations';
import { deleteOne, getAll, IReservation } from '../../ducks/reservations';

function mapStateToProps({ reservations }: IApplicationState) {
  return { reservations }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(getAll()),
    deleteOne: (item: IReservation) => dispatch(deleteOne(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);
