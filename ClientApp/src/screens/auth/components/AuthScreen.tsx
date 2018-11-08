import * as React from 'react';
import { Form, Button, Container } from 'semantic-ui-react';

interface IAuthScreenProps {
  readonly login
  readonly register
}

interface IAuthScreenState {
  email: string
  password: string
}

export class AuthScreen extends React.Component<IAuthScreenProps, IAuthScreenState> {
  public state = {
    email: '',
    password: ''
  }

  public changeEmail = ({ target }) => this.setState({ email: target.value })
  public changePassword = ({ target }) => this.setState({ password: target.value })

  public onSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    this.props.login({
      email,
      password,
    })
  }

  public register = () => {
    const { email, password } = this.state;

    this.props.register({
      email,
      password
    })
  }

  public render() {

    const { email, password } = this.state;

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label htmlFor="email">Email</label>
            <input name="email"
              type="email"
              id="email"
              placeholder="test@test.se"
              onChange={this.changeEmail}
              value={email}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input name="password"
              type="password"
              id="password"
              min="1"
              max="5"
              placeholder="3"
              onChange={this.changePassword}
              value={password}
            />
          </Form.Field>
          <Button type="submit" color="green"> Login </Button>
        </Form>
        <Button color="red" onClick={this.register} > Register </Button>
      </Container>
    );
  }
}

export default AuthScreen;