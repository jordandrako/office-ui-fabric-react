import * as React from 'react';
import { ProgressIndicatorBase } from '../ProgressIndicator.base';
import { BaseComponent, customizable } from '../../../Utilities';
import { IProgressIndicatorProps } from '../ProgressIndicator.types';

@customizable('StackedProgressIndicator', ['theme'])
export class StackedProgressIndicator extends BaseComponent<IProgressIndicatorProps, {}> {
  public render() {
    return (
      <ProgressIndicatorBase
        { ...this.props }
      />
    );
  }
}
