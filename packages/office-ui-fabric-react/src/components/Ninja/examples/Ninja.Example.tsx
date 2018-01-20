import * as React from 'react';
import { Ninja } from '../Ninja';

export class NinjaExample extends React.Component<{}, {}> {
  render() {
    return (
      <Ninja
        cowl={ true }
        weapons={ [
          'ninja star',
          'katana',
          'laptop'
        ] }
        name='kitty'
      />);
  }
}