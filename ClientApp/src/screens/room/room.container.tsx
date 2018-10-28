import * as React from 'react';
import { connect } from 'react-redux';
import { IRoom } from './room.interface';
import { Container, List } from 'semantic-ui-react';
import { IApplicationState } from '../../store/configureStore';
import * as roomActions from './room.actions';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly getAll: () => any
}

export class Rooms extends React.Component<IPropsFromState, IPropsFromState>{

  public async componentDidMount() {
    await this.props.getAll();
  }

  public renderList = (rooms) => rooms.map(room => <List.Item key={room.id}>{room.name}</List.Item>)

  public render(){
    const { rooms } = this.props;
    return (
      <Container>
        <List divided={true} relaxed={true}>
          {this.renderList(rooms)}
        </List>
      </Container>
    );
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
