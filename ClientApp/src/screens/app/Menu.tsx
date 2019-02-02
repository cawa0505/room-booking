import * as React from 'react'
import { Menu } from 'semantic-ui-react'
import { Screens, MenuSelect } from '../../ducks/menu';
import { IAuth } from '../../ducks/auth';

interface INavigationMenuProps {
  readonly logout: () => void;
  readonly auth: IAuth;
  readonly selectMenuItem: (name: MenuSelect) => void;
}

export class NavigationMenu extends React.PureComponent<INavigationMenuProps>{
  public state = { activeItem: 'login' }

  public handleItemClick = (e: React.MouseEvent<HTMLElement>, { name }: { name: MenuSelect }) => {
    this.props.selectMenuItem(name);
    this.setState({ activeItem: name })
  }

  public logout(): void {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      this.props.logout();
    }
  }

  public render() {
    const { activeItem } = this.state;
    const { auth } = this.props;
    if (auth.loggedIn) {
      return (
        <Menu vertical={true} >
          <Menu.Item name={Screens.makeReservation} active={activeItem === Screens.makeReservation} onClick={this.handleItemClick}>
            Make Reservation
          </Menu.Item>
          <Menu.Item name={Screens.yourReservations} active={activeItem === Screens.yourReservations} onClick={this.handleItemClick}>
            Your Reservations
          </Menu.Item>
          <Menu.Item name={Screens.createRoom} active={activeItem === Screens.createRoom} onClick={this.handleItemClick}>
            Create Room
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.props.logout}>
            Logout
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu vertical={true} pointing={true}>
          <Menu.Item name={Screens.login} active={activeItem === Screens.login} onClick={this.handleItemClick}>
            Login
          </Menu.Item>
        </Menu>
      );
    }

  }
}

export default NavigationMenu;