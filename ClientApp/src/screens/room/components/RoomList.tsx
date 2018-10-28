import * as React from 'react';
import { List } from 'semantic-ui-react';
import { IRoom } from '../room.interface';
import * as actions from '../room.actions';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly getAll: () => actions.IGetAll
}

export class RoomList extends React.Component<IPropsFromState>{

  public async componentDidMount() {
    await this.props.getAll();
  }

  public renderList = (rooms) => rooms.map(room => <List.Item key={room.id}>{room.name}</List.Item>)

  public render(){
    const { rooms } = this.props;
    return (
        <List divided={true} relaxed={true}>
          {this.renderList(rooms)}
        </List>
    )
  }
}

export default RoomList;
