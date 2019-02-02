import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Rooms from '../rooms/rooms.container';
import Auth from '../auth/auth.container';
import Menu from './Menu';
import Header from './Header';
import { MenuSelect, Screens, selectMenuItem } from '../../ducks/menu';
import { logout, IAuth } from '../../ducks/auth';
import { CreateRoom } from '../rooms/components/CreateRoom';
import { create, IRoom } from '../../ducks/rooms';
import Reservations from '../reservations/reservations.container';
import { IApplicationState } from '../../store/index';

interface IAppProps {
  readonly auth: IAuth
  readonly menu: MenuSelect;
  readonly selectMenuItem: (menu: MenuSelect) => void
  readonly logout: () => void
  readonly createRoom: (room: IRoom) => void
}

class App extends React.Component<IAppProps, {}> {

  public render() {
    return (
      <React.Fragment>
        <Header />
        <Grid container={true} columns={2} stackable={true}>
          <Grid.Column computer={4} mobile={16} tablet={16} style={{ display: 'flex', justifyContent: 'center' }}>
            <Menu auth={this.props.auth} logout={this.props.logout} selectMenuItem={this.props.selectMenuItem} />
          </Grid.Column>
          <Grid.Column computer={12} mobile={16} tablet={16}>
            {
              this.props.auth.loggedIn
                ? this.props.menu === Screens.makeReservation
                  ? <Rooms />
                  : this.props.menu === Screens.yourReservations
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

function mapStateToProps({ menu, auth }: IApplicationState) {
  return { menu, auth }
}

function mapDispatchToProps(dispatch) {
  return {
    selectMenuItem: (item: MenuSelect) => dispatch(selectMenuItem(item)),
    logout: () => dispatch(logout()),
    createRoom: (room: IRoom) => dispatch(create(room))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
