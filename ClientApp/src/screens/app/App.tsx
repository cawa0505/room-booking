import * as React from 'react';
import Rooms  from '../room/room.container';
import Reservations from '../reservation/reservation.container';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <React.Fragment>
        <Rooms />
        <Reservations />
      </React.Fragment>
    )
  }
}

export default App;
