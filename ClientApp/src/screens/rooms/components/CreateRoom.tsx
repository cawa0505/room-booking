import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';

interface IState {
  location: string
  floor: number
  size: number
  roomType: number
}

interface IProps {
  create: (newRoom) => any
}

const floorOptions = [
  { key: '0', text: 'Ground Floor', value: '0' },
  { key: '1', text: 'First', value: '1' },
  { key: '2', text: 'Second', value: '2' },
  { key: '3', text: 'Third', value: '3' },
]

const roomTypeOptions = [
  { key: '0', text: 'Group', value: '0' },
  { key: '1', text: 'Conference', value: '1' },
  { key: '2', text: 'Lecture', value: '2' },
  { key: '3', text: 'Single Desk', value: '3' },
]



export class CreateRoom extends React.Component<IProps, IState>{

  public state = {
    location: '',
    floor: 0,
    size: 4,
    roomType: 0
  }

  public changeLocation = (e, { value }) => this.setState({ location: value });
  public changeFloor = (e, { value }) => this.setState({ floor: parseInt(value, 10) });
  public changeRoomType = (e, { value }) => this.setState({ roomType: parseInt(value, 10) });
  public changeSize = (e, { value }) => this.setState({ size: parseInt(value, 10) });


  public onSubmit = (event) => {
    event.preventDefault();
    this.props.create({
      location: this.state.location,
      floor: this.state.floor,
      size: this.state.size,
      type: this.state.roomType
    })
  }

  public render() {

    const { location, roomType, floor, size } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input
          required={true}
          label="Location/name"
          name="location"
          onChange={this.changeLocation}
          valeu={location}
          placeholder="Location or name"
        />
        <Form.Group widths='equal'>
          <Form.Input
            required={true}
            label="Size"
            name="size"
            type="number"
            min="1"
            max="30"
            onChange={this.changeSize}
            value={size}
            placeholder="Size"
          />
          <Form.Select
            required={true}
            options={floorOptions}
            label="Floor"
            name="Floor"
            onChange={this.changeFloor}
            value={floor}
            placeholder="Choose a floor"
          />
          <Form.Select
            required={true}
            options={roomTypeOptions}
            label="Room type"
            name="Room type"
            onChange={this.changeRoomType}
            value={roomType}
            placeholder="Choose a room type"
          />
        </Form.Group>
        <Button type="submit" color="green"> Create Room </Button>
      </Form >
    );
  }
}

export default CreateRoom;