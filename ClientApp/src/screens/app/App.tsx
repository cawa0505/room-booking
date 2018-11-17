import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Rooms from '../rooms/rooms.container';
import Auth from '../auth/auth.container';
import Menu from './Menu';
import Header from './Header';
import * as menuActions from '../../ducks/menu';
import { logoutLocallySuccess } from '../../ducks/auth';
import { CreateRoom } from '../rooms/components/CreateRoom';
import { create } from '../../ducks/rooms';
import Reservations from '../reservations/reservations.container';

interface IAppProps {
  auth
  menu
  selectMenuItem
  logout
  createRoom
}

class App extends React.Component<IAppProps, {}> {

  public render() {
    return (
      <React.Fragment>
        <Header />
        <Grid container={true} columns={2} stackable={true}>
          <Grid.Column width={4}>
            <Menu logout={this.props.logout} selectMenuItem={this.props.selectMenuItem} />
          </Grid.Column>
          <Grid.Column width={12}>
            {
              this.props.auth.loggedIn
                ? this.props.menu === menuActions.Screens.makeReservation
                  ? <Rooms />
                  : this.props.menu === menuActions.Screens.yourReservations
                    ? <Reservations />
                    : <CreateRoom create={this.props.createRoom} />
                : <Auth />
            }
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ menu, auth }) {
  return { menu, auth }
}

function mapDispatchToProps(dispatch) {
  return {
    selectMenuItem: (item) => dispatch(menuActions.selectMenuItem(item)),
    logout: () => dispatch(logoutLocallySuccess()),
    createRoom: (room) => dispatch(create(room))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
