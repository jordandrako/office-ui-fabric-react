import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { INinjaProps } from './Ninja.types';


export class Ninja extends BaseComponent<INinjaProps, {}> {
  render() {
    return (
      <div>You shouldn't see me. 🐱‍👤</div>
    )
  }
}