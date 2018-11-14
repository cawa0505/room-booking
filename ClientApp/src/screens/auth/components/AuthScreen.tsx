import * as React from 'react';
import { Form, Button, Container } from 'semantic-ui-react';

interface IAuthScreenProps {
  readonly login
  readonly register
  readonly loginLocal
  readonly error
  readonly auth
  readonly logout
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
    event.preventDefault();
    const { email, password } = this.state;
    if (password === "bunneltan") {
      this.props.loginLocal(email);
      sessionStorage.setItem('email', email);
    } else {
      this.props.error();
    }
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
    if (this.props.auth.loggedIn) {
      return <Button
        style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        color="red"
        onClick={this.props.logout}>
        Logout
            </Button>
    }
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
              placeholder="bunneltan"
              onChange={this.changePassword}
              value={password}
            />
          </Form.Field>
          <Button type="submit" color="green"> Login </Button>
        </Form>
      </Container>
    );
  }
}

export default AuthScreen;