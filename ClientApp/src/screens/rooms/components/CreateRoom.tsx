import * as React from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';

interface IState {
  location: string
  floor: number
  size: number
  type: number
}

interface IProps {
  readonly create: (newRoom: IState) => void
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
    type: 0
  }

  public changeLocation = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ location: value });

  public changeFloor = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ floor: parseInt(value, 10) });

  public changeRoomType = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ type: parseInt(value, 10) });

  public changeSize = (e: React.SyntheticEvent, { value }: { value: string }) =>
    this.setState({ size: parseInt(value, 10) });


  public onSubmit = (event: React.FormEvent) => {
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