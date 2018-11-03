import * as React from 'react';
import { Container, Divider, Table } from 'semantic-ui-react';
import { format } from 'date-fns';
import { IRoom } from '../room.interface';
import * as actions from '../room.actions';
import CreateRoom from './CreateRoom';
import { generateDays, generateTimeSlots } from '../../../helpers';
import TimeSlotCell from './TimeSlotCell';

interface IPropsFromState {
  readonly rooms: IRoom[]
  readonly getAll: () => actions.IGetAll
  readonly create: (newRoom) => any
}

export class RoomList extends React.Component<IPropsFromState>{

  public state = {
    days: [],
    timeSlots: [],
    selectedDate: '',
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
    this.setState({ 
      timeSlots: generateTimeSlots(),
      days: generateDays()
    });
  }

  public selectDate = (date) => {
    this.setState({selectedDate: date });
  }

  public renderTableHeader = () => this.state.days.map((day) => 
    <Table.HeaderCell key={format(day)}>
      <span>{format(day, 'ddd')}</span>
      <p>{format(day, 'MM/DD')}</p>
    </Table.HeaderCell>
  )

  public renderTimeSlotRows = () => 
      this.state.timeSlots.map(timeSlot => {
        return(
          <Table.Row key={format(timeSlot, 'HH:mm')}>
            {this.renderTimeSlotCells(timeSlot)}
          </Table.Row>
        )
      })
  
  public renderTimeSlotCells = (timeSlot) =>
    this.state.days.map(day => (
        <TimeSlotCell 
          day={day} 
          timeSlot={timeSlot} 
          reservations={this.state.selectedRoom.reservations}
          selectedDate={this.state.selectedDate}
          selectDate={this.selectDate}
        />
      )
    )

  public renderTable = () => {
    return(
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
