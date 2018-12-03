import * as React from 'react';
import { hot } from 'react-hot-loader';
import Count from './Count';
import LoadableHello from './Async';

class App extends React.Component {
  public componentDidMount() {
    // todo
  }

  public render() {
    return (
      <div>
        <LoadableHello />
        <Count />
        this is test
      </div>
    );
  }
}
export function test() {
  alert('hello this is test1');
}
export default hot(module)(App);
