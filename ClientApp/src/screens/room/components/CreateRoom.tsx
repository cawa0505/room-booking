import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';

interface IState {
  name: string
}

interface IProps {
  create: (newRoom) => any
}

export class CreateRoom extends React.Component<IProps, IState>{

  public state = {
    name: ''
  }

  public onChange = ({ target }) => this.setState({ name: target.value });

  public onSubmit = (event) => {
    event.preventDefault();
    this.props.create({
      Name: this.state.name
    })
  }

  public render() {

    const { name } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label htmlFor="name">Name of room</label>
          <input name="name"
            type="text"
            id="name"
            placeholder="Add new room"
            onChange={this.onChange}
            value={name}
          />
        </Form.Field>
        <Button type="submit" color="green"> Create Room </Button>
      </Form>
    );
  }
}

export default CreateRoom;