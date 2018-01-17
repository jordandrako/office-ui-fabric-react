import * as React from 'react';
import { Ninja } from './Ninja';

export interface INinjaProps extends React.Props<Ninja> {
  /**
   * Gets the component ref
   */
  componentRef?: () => void;
  cowl: boolean;
  weapons?: string[];
  name: string;
}