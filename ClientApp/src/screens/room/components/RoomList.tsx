import * as React from 'react';
import { Container, Divider, Table } from 'semantic-ui-react';
import { format, setHours, setMinutes, setSeconds, addDays  } from 'date-fns';
import { IRoom } from '../room.interface';
import * as actions from '../room.actions';
import CreateRoom from './CreateRoom';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly getAll: () => actions.IGetAll
  readonly create: (newRoom) => any
}

export class RoomList extends React.Component<IPropsFromState>{

  public state = {
    selectedRoom: {
      id:1,
      location:"A302",
      floor:3,
      size:6,
      type:0,
      reservations:[
        {
          id:1,
          reservedBy:"Jesper",
          roomId:1,
          startTime: new Date("2018-11-01T08:00:00"),
          endTime: new Date("2018-11-01T10:00:00"),
          length:2
        },
        {
          id:2,
          reservedBy:"Jesper",
          roomId:1,
          startTime: new Date("2018-11-02T12:00:00"),
          endTime: new Date("2018-11-02T14:00:00"),
          length:2
        }
    ]
    }
  }

  public async componentDidMount() {
    await this.props.getAll();
    this.setState({ timeSlots: this.generateTimeSlotsArray()});
  }
  
  public generateDays = () => {
    const numberOfDays = 5;
    const days: Date[] = [];
    for(let i = 0; i < numberOfDays; i++){
      days.push(addDays(new Date(), i));
    }
    return days;
  }

  public generateTimeSlotsArray = (startHour = 8, endHour = 17, intervalMinutes = 30) => {

    const timeSlots: Date[] = [];
    let currentTimeSlot = new Date();
  
    for (let i = startHour; i < endHour; i++) {
  
      currentTimeSlot = setHours(currentTimeSlot, i);
  
      for (let j = 0; j < 60; j += intervalMinutes) {
        currentTimeSlot = setMinutes(currentTimeSlot, j);
        currentTimeSlot = setSeconds(currentTimeSlot, 0);
        timeSlots.push(currentTimeSlot);
      }
  
    }
    return timeSlots;
  };

  public renderTableHeader = () => this.generateDays().map((day) => 
    <Table.HeaderCell key={format(day)}>
      <span>{format(day, 'ddd')}</span>
      <p>{format(day, 'MM/DD')}</p>
    </Table.HeaderCell>
  )

  public checkIfReserved = (slot, day) => {
    let reserved = false;
    for(const reservation of this.state.selectedRoom.reservations){
      const checkDate = (reservation.startTime.getHours() === new Date(slot).getHours())
        && (new Date(day).getDay() === reservation.startTime.getDay())
      if(checkDate){
        reserved = true;
      }
    }
    return reserved;
  }

  public renderTimeSlots = () => 
    this.generateTimeSlotsArray()
      .map(timeSlot => {
        return(
          <Table.Row key={format(timeSlot, 'HH:mm')}>
            {this.generateDays().map(day => {
              const reserved = this.checkIfReserved(timeSlot, day);
              return(
                <Table.Cell key={format(day, 'YYYY-MM-DD')} error={reserved} disabled={reserved}>
                  { format(timeSlot, 'HH:mm') }
                </Table.Cell>
              )
            }
          )}
        </Table.Row>
      )})
  
  public renderTable = () => {
    return(
      <Table columns={5} celled={true} compact={true}>
        <Table.Header>
          {this.renderTableHeader()}
        </Table.Header>
        <Table.Body>
          {this.renderTimeSlots()}
        </Table.Body>
      </Table>
    )
  }

  public render(){
    const { create } = this.props;
    return (
        <Container>
          <CreateRoom create={create} />
          <Divider />
          {this.renderTable()}
        </Container>
    )
  }
}

export default RoomList;
