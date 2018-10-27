import * as React from 'react';
import { connect } from 'react-redux';
import { IRoom } from './room.interface';
import { IApplicationState } from '../../store/configureStore';
import * as roomActions from './room.actions';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly getAll: () => any
}

class Rooms extends React.Component<IPropsFromState, IPropsFromState>{

  public async componentDidMount() {
    await this.props.getAll();
  }

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

function mapDispatchToProps(dispatch){
  return {
    getAll: () => dispatch(roomActions.getAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
