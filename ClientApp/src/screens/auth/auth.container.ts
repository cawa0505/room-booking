import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import AuthScreen from './components/AuthScreen';
import { IUserObject, login, logout, register } from '../../ducks/auth';

function mapStateToProps({ auth }: IApplicationState) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user: IUserObject) => dispatch(login(user)),
    register: (user: IUserObject) => dispatch(register(user)),
    error: () => dispatch({ type: '[@errors]', payload: 'Wrong password' }),
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
