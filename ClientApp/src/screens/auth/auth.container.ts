import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import AuthScreen from './components/AuthScreen';
import { IUserObject, login, loginLocallySuccess, register, logoutLocallySuccess } from '../../ducks/auth';

function mapStateToProps({ auth }: IApplicationState) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user: IUserObject) => dispatch(login(user)),
    loginLocal: (user: IUserObject) => dispatch(loginLocallySuccess(user)),
    register: (user: IUserObject) => dispatch(register(user)),
    error: () => dispatch({ type: '[@errors]', payload: 'Wrong password' }),
    logout: () => dispatch(logoutLocallySuccess())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
