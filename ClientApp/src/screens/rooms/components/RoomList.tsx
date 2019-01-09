import * as React from 'react';
import { Divider, Table, Button, Dropdown } from 'semantic-ui-react';
import { format, addHours } from 'date-fns';
import { IRoom } from '../../../ducks/rooms';
import { IAuth } from '../../../ducks/auth';
import { generateDays, generateTimeSlots } from '../../../helpers';
import TimeSlotCell from './TimeSlotCell';
import initialState from '../../../store/initialState';
import { IMakeReservation } from 'src/ducks/reservations';

interface IRoomListProps {
  readonly rooms: IRoom[]
  readonly selectedRoom: IRoom
  readonly auth: IAuth;
  readonly getAll: () => void
  readonly selectRoom: (room: IRoom) => void
  readonly makeReservation: (reservation) => void
  readonly deleteReservation: (reservation) => void
}

interface IRoomListState {
  days: Date[];
  timeSlots: Date[];
  selectedDate: Date;
}

export class RoomList extends React.Component<IRoomListProps, IRoomListState>{

  public state = {
    days: [],
    timeSlots: [],
    selectedDate: new Date(),
  }

  public async componentDidMount() {
    await this.props.getAll();
    this.setState({
      timeSlots: generateTimeSlots(),
      days: generateDays()
    });
  }

  public componentWillUnmount() {
    this.props.selectRoom(initialState.selectedRoom);
  }

  public selectDate = (date: Date) => {
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

  public selectRoom = (e, { value }) => {
    const room = this.props.rooms.find(item => item.id === value);
    this.props.selectRoom(room);
  }

  public makeReservation = () => {
    const startTime = format(this.state.selectedDate);
    const endTime = format(addHours(this.state.selectedDate, 1));
    const reservation: IMakeReservation = {
      reservedBy: this.props.auth.user,
      roomId: this.props.selectedRoom.id,
      startTime,
      endTime,
      length: 1
    };
    this.props.makeReservation(reservation);
  }

  public renderRoomList = () => {
    const options = this.props.rooms.map(room => ({ text: room.location, value: room.id }))
    return <Dropdown
      selection={true}
      name='location'
      options={options}
      placeholder='Choose a room'
      onChange={this.selectRoom}
    />
  }

  public render() {
    const { auth } = this.props;
    if (!auth.loggedIn) {
      return null;
    }
    return (
      <React.Fragment>
        {this.renderRoomList()}
        <Divider />
        {this.props.selectedRoom.id > 0 &&
          <React.Fragment>
            {this.renderTable()}
            <Button color="green" disabled={!this.state.selectedDate} onClick={this.makeReservation} > Reserve </Button>
          </React.Fragment>
        }

      </React.Fragment>
    )
  }
}


export default RoomList;
