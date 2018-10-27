import * as React from 'react';
import { connect } from 'react-redux';
import { IRoom } from './room.interface';
import { IApplicationState } from '../../store/configureStore';

interface IPropsFromState {
  readonly rooms: IRoom[]
}

class Rooms extends React.Component<IPropsFromState, IPropsFromState>{

  public state = {
    rooms: [{ name: 'hello'}]
  }

  public async componentDidMount() {
    const result = await fetch('/api/room');
    const rooms = await result.json();
    this.setState({ rooms });
  }

  public render(){
    return <div>
      {
        this.state.rooms.map(room => <p key={room.name}>{room.name}</p>)
      }
    </div>
  }
}

function mapStateToProps(state: IApplicationState){
  return { rooms: state.rooms }
}

export default connect(mapStateToProps)(Rooms);
