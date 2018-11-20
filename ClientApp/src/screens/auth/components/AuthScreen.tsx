import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { IUserObject, IAuth } from '../../../ducks/auth';

interface IAuthScreenProps {
  readonly login: (user: IUserObject) => void;
  readonly register: (user: IUserObject) => void;
  readonly loginLocal: (user: IUserObject) => void;
  readonly error: () => void;
  readonly auth: IAuth
  readonly logout: () => void;
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

  public changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })
  public changePassword = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (password === "bunneltan") {
      this.props.loginLocal({ email, password });
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
      </Form>
    );
  }
}

export default AuthScreen;