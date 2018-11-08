import * as React from 'react';
import { Container, Divider, Table, List, Button, Icon } from 'semantic-ui-react';
import { format, addHours } from 'date-fns';
import { IRoom } from '../../../ducks/rooms';
import * as roomActions from '../../../ducks/rooms';
import CreateRoom from './CreateRoom';
import { generateDays, generateTimeSlots } from '../../../helpers';
import TimeSlotCell from './TimeSlotCell';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly selectedRoom: IRoom
  readonly menu: boolean
  readonly getAll: () => roomActions.IGetAll
  readonly create: (newRoom) => any
  readonly selectRoom: (room) => any
  readonly makeReservation: (date) => any
  readonly showMenu: () => any
  readonly hideMenu: () => any
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

  public makeReservation = () => {
    const startTime = this.state.selectedDate;
    const endTime = addHours(this.state.selectedDate, 2);
    const reservation = {
      reservedBy: 'Jesper',
      roomId: this.props.selectedRoom.id,
      startTime,
      endTime,
      length: 1
    }
    this.props.makeReservation(reservation);
  }

  public renderRoomList = () => this.props.rooms.map(room =>
    <List.Item key={room.id} onClick={() => this.selectRoom(room)}>{
      room.id === this.props.selectedRoom.id
        ? <List.Header as="h3"> <Icon name="arrow right" /> {room.location}</List.Header>
        : <List.Header> {room.location}</List.Header>
    }</List.Item>
  )

  public render() {
    const { create } = this.props;
    return (
      <Container>
        {
          this.props.menu
            ? <Icon name="plus" onClick={this.props.hideMenu} style={{ position: 'absolute', top: 10, left: 10 }} />
            : <Icon name="fax" onClick={this.props.showMenu} style={{ position: 'absolute', top: 10, left: 10 }} />
        }

        {this.props.menu && <CreateRoom create={create} />}
        <Divider />
        <List selection={true}>
          {this.renderRoomList()}
        </List>
        <Divider />
        {this.props.selectedRoom.id > 0 &&
          <React.Fragment>
            {this.renderTable()}
            <Button color="green" disabled={!this.state.selectedDate} onClick={this.makeReservation} > Reserve </Button>
          </React.Fragment>
        }

      </Container>
    )
  }
}


export default RoomList;
