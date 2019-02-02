import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { IUserObject, IAuth } from '../../../ducks/auth';

interface IAuthScreenProps {
  readonly login: (user: IUserObject) => void;
  readonly register: (user: IUserObject) => void;
  readonly error: () => void;
  readonly auth: IAuth
  readonly logout: () => void;
}

interface IAuthScreenState {
  email: string;
  password: string;
}

export class AuthScreen extends React.Component<IAuthScreenProps, IAuthScreenState> {

  public state = {
    email: '',
    password: ''
  }

  private changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })
  private changePassword = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })

  private onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  }

  private register = () => {
    const { email, password } = this.state;
    this.props.register({
      email,
      password
    })
  }

  public render() {

    const { email, password } = this.state;
    return (
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
        <Button type="button" color="red" onClick={this.register}> Register </Button>
      </Form>
    );
  }
}

export default AuthScreen;