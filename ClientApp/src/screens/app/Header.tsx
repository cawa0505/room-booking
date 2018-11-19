import * as React from 'react';

class Header extends React.Component<{}, {}> {
  public render() {
    return <header style={{ textAlign: 'center', margin: '2rem' }}>
      <h1>Room Booking</h1>
    </header>
  }
}

export default Header;
