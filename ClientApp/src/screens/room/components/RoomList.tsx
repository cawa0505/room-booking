import * as React from 'react';
import { List, Container, Divider } from 'semantic-ui-react';
import { IRoom } from '../room.interface';
import * as actions from '../room.actions';
import CreateRoom from './CreateRoom';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly getAll: () => actions.IGetAll
  readonly create: (newRoom) => any
}

export class RoomList extends React.Component<IPropsFromState>{

  public async componentDidMount() {
    await this.props.getAll();
  }

  public renderList = (rooms) => rooms.map(room => <List.Item key={room.id}>{room.location}</List.Item>)

  public render(){
    const { rooms, create } = this.props;
    return (
        <Container>
          <CreateRoom create={create} />
          <Divider />
          <List divided={true} relaxed={true}>
            {this.renderList(rooms)}
          </List>
        </Container>
    )
  }
}

export default RoomList;
