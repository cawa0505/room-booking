import * as React from 'react';

interface IPropsFromState {
  readonly getAll: () => any
}

export class Reservations extends React.Component<IPropsFromState> {

  public componentWillMount(){
    this.props.getAll();
  }

  public render(){
    return null;
  }
}

export default Reservations;