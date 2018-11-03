import * as React from 'react';
import Rooms from '../room/room.container';
import Header from './Header';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Rooms />
      </React.Fragment>
    )
  }
}

export default App;
