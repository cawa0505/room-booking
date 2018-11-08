import { connect } from 'react-redux';
import { IApplicationState } from '../../store/configureStore';
import * as actions from './auth.actions';

function mapStateToProps({ auth }: IApplicationState) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(null);
