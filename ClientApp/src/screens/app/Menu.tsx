import * as React from 'react'
import { Menu } from 'semantic-ui-react'
import { Screens } from '../../ducks/menu';

interface INavigationMenuProps {
  logout
  selectMenuItem
}

export class NavigationMenu extends React.Component<INavigationMenuProps>{
  public state = { activeItem: 'inbox' }

  public handleItemClick = (e, { name }) => {
    this.props.selectMenuItem(name);
    this.setState({ activeItem: name })
  }

  public logout() {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      this.props.logout();
    }
  }

  public render() {
    const { activeItem } = this.state

    return (
      <Menu vertical={true}>
        <Menu.Item name={Screens.makeReservation} active={activeItem === Screens.makeReservation} onClick={this.handleItemClick}>
          Make Reservation
        </Menu.Item>
        <Menu.Item name={Screens.yourReservations} active={activeItem === Screens.yourReservations} onClick={this.handleItemClick}>
          Your Reservations
        </Menu.Item>
        <Menu.Item name={Screens.createRoom} active={activeItem === Screens.createRoom} onClick={this.handleItemClick}>
          Create Room
        </Menu.Item>
        <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.logout}>
          Logout
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavigationMenu;