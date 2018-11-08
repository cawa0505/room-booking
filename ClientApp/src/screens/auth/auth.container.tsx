import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import AuthScreen from './components/AuthScreen';
import * as authActions from '../../ducks/auth';

function mapStateToProps({ auth }: IApplicationState) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (authObject) => dispatch(authActions.login(authObject)),
    register: (authObject) => dispatch(authActions.register(authObject))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
