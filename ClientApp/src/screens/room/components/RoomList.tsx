import * as React from 'react';
import { Container, Divider, Table, List } from 'semantic-ui-react';
import { format } from 'date-fns';
import { IRoom } from '../room.interface';
import * as actions from '../room.actions';
import CreateRoom from './CreateRoom';
import { generateDays, generateTimeSlots } from '../../../helpers';
import TimeSlotCell from './TimeSlotCell';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly selectedRoom: IRoom
  readonly getAll: () => actions.IGetAll
  readonly create: (newRoom) => any
  readonly selectRoom: (room) => any
}

export class RoomList extends React.Component<IPropsFromState>{

  public state = {
    days: [],
    timeSlots: [],
    selectedDate: ''
  }

  public async componentDidMount() {
    await this.props.getAll();
    this.setState({
      timeSlots: generateTimeSlots(),
      days: generateDays()
    });
  }

  public selectDate = (date) => {
    this.setState({ selectedDate: date });
  }

  public renderTableHeader = () => this.state.days.map((day) =>
    <Table.HeaderCell key={format(day)}>
      <span>{format(day, 'ddd')}</span>
      <p>{format(day, 'MM/DD')}</p>
    </Table.HeaderCell>
  )

  public renderTimeSlotRows = () =>
    this.state.timeSlots.map(timeSlot => {
      return (
        <Table.Row key={format(timeSlot, 'HH:mm')}>
          {this.renderTimeSlotCells(timeSlot)}
        </Table.Row>
      )
    })

  public renderTimeSlotCells = (timeSlot) =>
    this.state.days.map(day => (
      <TimeSlotCell
        key={format(day)}
        day={day}
        timeSlot={timeSlot}
        reservations={this.props.selectedRoom.reservations}
        selectedDate={this.state.selectedDate}
        selectDate={this.selectDate}
      />
    )
    )

  public renderTable = () => {
    return (
      <Table columns={5} celled={true} compact={true} unstackable={true}>
        <Table.Header>
          <Table.Row>
            {this.renderTableHeader()}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderTimeSlotRows()}
        </Table.Body>
      </Table>
    )
  }

  public selectRoom = (room) => {
    this.props.selectRoom(room);
  }

  public renderRoomList = () => this.props.rooms.map(room =>
    <List.Item key={room.id} onClick={() => this.selectRoom(room)}>{room.location}</List.Item>
  )

  public render() {
    const { create } = this.props;
    return (
      <Container>
        <CreateRoom create={create} />
        <Divider />
        <List>
          {this.renderRoomList()}
        </List>
        {this.props.selectedRoom.id > 0 && this.renderTable()}
      </Container>
    )
  }
}


export default RoomList;
