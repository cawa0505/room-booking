import * as React from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { floorOptions, roomTypeOptions } from './options';

interface ICreateRoomProps {
  readonly create: (newRoom: ICreateRoomState) => void
}

interface ICreateRoomState {
  location: string
  floor: number
  size: number
  type: number
}

export class CreateRoom extends React.Component<ICreateRoomProps, ICreateRoomState>{

  public state = {
    location: '',
    floor: 0,
    size: 4,
    type: 0
  }

  private changeLocation = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ location: value });

  private changeFloor = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ floor: parseInt(value, 10) });

  private changeRoomType = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ type: parseInt(value, 10) });

  private changeSize = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ size: parseInt(value, 10) });


  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.create({
      location: this.state.location,
      floor: this.state.floor,
      size: this.state.size,
      type: this.state.type
    })
  }

  public render() {

    const { location, size } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Input
            width={12}
            required={true}
            label="Location/name"
            name="location"
            onChange={this.changeLocation}
            valeu={location}
            placeholder="Location or name"
          />
          <Form.Input
            width={4}
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
        </Form.Group>
        <Form.Group>
          <Dropdown
            style={{ margin: '0 .5rem' }}
            required={true}
            selection={true}
            fluid={true}
            name='floor'
            options={floorOptions}
            placeholder='Choose a floor'
            onChange={this.changeFloor}
          />
          <Dropdown
            style={{ margin: '0 .5rem' }}
            required={true}
            selection={true}
            fluid={true}
            name='room'
            options={roomTypeOptions}
            placeholder='Choose a room type'
            onChange={this.changeRoomType}
          />
        </Form.Group>
        <Button type="submit" color="green"> Create Room </Button>
      </Form >
    );
  }
}

export default CreateRoom;