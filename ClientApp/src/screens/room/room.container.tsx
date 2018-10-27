import * as React from 'react';
import { connect } from 'react-redux';
import { IRoom } from './room.interface';
import { IApplicationState } from '../../store/configureStore';

interface IPropsFromState {
  readonly rooms: IRoom[]
}

class Rooms extends React.Component<IPropsFromState>{

  public render(){
    return <div>
      {
        this.props.rooms.map(room => <p key={room.name}>{room.name}</p>)
      }
    </div>
  }
}

function mapStateToProps(state: IApplicationState){
  return { rooms: state.rooms }
}

export default connect(mapStateToProps)(Rooms);
