import * as React from 'react';
import Rooms  from '../room/room.container';
import Reservations from '../reservation/reservation.container';
import Header from './Header';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Rooms />
        <Reservations />
      </React.Fragment>
    )
  }
}

export default App;
