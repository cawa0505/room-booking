import * as React from 'react';
import { List } from 'semantic-ui-react';
import { format } from 'date-fns';

interface IReservationsProps {
  reservations
  getAll
}

export class Reservations extends React.Component<IReservationsProps> {

  public async componentDidMount() {
    if (!this.props.reservations.length) {
      await this.props.getAll();
    }
  }

  public renderAllReservations() {
    return this.props.reservations.map(reservation => {
      return <List.Item key={reservation.id}> {format(reservation.startTime, 'MM/DD - hh:mm')} - {format(reservation.startTime, 'MM/DD - hh:mm')} </List.Item>
    })
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Your Reservations</h1>
        <List relaxed={true} divided={true} size="large">
          {this.renderAllReservations()}
        </List>
      </React.Fragment>
    )
  }
}

export default Reservations;