import * as React from 'react';
import { BaseComponent, css, classNamesFunction } from '../../Utilities';
import { INinjaProps } from './Ninja.types';
import { getStyles, INinjaStyleProps, INinjaStyles } from './Ninja.styles';

export class Ninja extends BaseComponent<INinjaProps, {}> {
  public render() {
    const getClassNames = classNamesFunction<INinjaStyleProps, INinjaStyles>();
    const classNames = getClassNames(getStyles, {
      isTestProp: true
    });
    return (
      <div>
        <p>Can you find the ninja below?</p>
        <div className={ css(classNames.root) }>You shouldn't see me. 🐱‍👤</div>
      </div>
    );
  }
}
