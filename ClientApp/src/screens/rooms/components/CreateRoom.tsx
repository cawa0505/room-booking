import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';

interface IState {
  location: string
  floor: number
  size: number
  type: number
}

interface IProps {
  create: (newRoom) => any
}

export class CreateRoom extends React.Component<IProps, IState>{

  public state = {
    location: '',
    floor: 0,
    size: 4,
    type: 0
  }

  public changeLocation = ({ target }) => this.setState({ location: target.value })
  public changeFloor = ({ target }) => this.setState({ floor: parseInt(target.value, 10) })

  public onSubmit = (event) => {
    event.preventDefault();
    this.props.create({
      location: this.state.location,
      floor: this.state.floor,
      size: this.state.size,
      type: this.state.type
    })
  }

  public render() {

    const { location, floor } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label htmlFor="location">Location</label>
          <input name="location"
            type="text"
            id="name"
            placeholder="A302"
            onChange={this.changeLocation}
            value={location}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="floor">Floor</label>
          <input name="floor"
            type="number"
            id="floor"
            min="1"
            max="5"
            placeholder="3"
            onChange={this.changeFloor}
            value={floor}
          />
        </Form.Field>
        <Button type="submit" color="green"> Create Room </Button>
      </Form>
    );
  }
}

export default CreateRoom;