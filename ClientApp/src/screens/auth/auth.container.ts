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
    loginLocal: (email) => dispatch(authActions.loginLocallySuccess(email)),
    register: (authObject) => dispatch(authActions.register(authObject)),
    error: () => dispatch({ type: '[@errors]', payload: 'Wrong password' }),
    logout: () => dispatch(authActions.logoutLocallySuccess())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
