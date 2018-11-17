import * as React from 'react';
import { List, Button, Header } from 'semantic-ui-react';
import { format } from 'date-fns';

interface IReservationsProps {
  reservations
  getAll
  deleteOne
}

export class Reservations extends React.Component<IReservationsProps> {

  public async componentDidMount() {
    await this.props.getAll();
  }

  public renderAllReservations() {
    return this.props.reservations.map(reservation => {
      return <List.Item key={reservation.id}>
        <List.Content>
          <List.Header>
            {format(reservation.startTime, 'MM/DD - hh:mm')} - {format(reservation.startTime, 'MM/DD - hh:mm')}
          </List.Header>
          {reservation.room.location}

        </List.Content>
        <List.Content floated="right">
          <Button color="red" onClick={() => this.props.deleteOne(reservation)}>Remove Reservation</Button>
        </List.Content>
      </List.Item>
    })
  }

  public render() {
    return (
      <React.Fragment>
        <Header>Your Reservations</Header>
        <List relaxed={true} divided={true} size="large">
          {this.renderAllReservations()}
        </List>
      </React.Fragment>
    )
  }
}

export default Reservations;