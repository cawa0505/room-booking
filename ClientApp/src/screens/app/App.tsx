import * as React from 'react';
import Rooms from '../rooms/rooms.container';
import Auth from '../auth/auth.container';
import Header from './Header';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Auth />
        <Rooms />
      </React.Fragment>
    )
  }
}

export default App;
