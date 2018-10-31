import * as React from 'react';
import { List, Container, Divider, Header} from 'semantic-ui-react';
import { format } from 'date-fns';
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

  public renderList = (rooms) => rooms.map(room => 
    <List.Item key={room.id}>
      <Header as="h2">{room.location}</Header>
      <List>
        {room.reservations.map(reservation => 
          <List.Item key={reservation.id}>
            <p>
              <List.Icon name="checked calendar" />
              <strong>
                { format(reservation.startTime, 'dddd - DD/MM')}
              </strong>
            </p>
            { format(reservation.startTime, 'HH:mm')  } 
            - 
            { format(reservation.endTime, 'HH:mm')  }
            </List.Item>
          )
        }
      </List>
    </List.Item>)

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
