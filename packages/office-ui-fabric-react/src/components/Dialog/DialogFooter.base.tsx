import * as React from 'react';
import {
  IDialogFooterProps,
  IDialogFooterStyleProps,
  IDialogFooterStyles,
} from './DialogFooter.types';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  IClassNames
} from '../../Utilities';

const getClassNames = classNamesFunction<IDialogFooterStyleProps, IDialogFooterStyles>();

@customizable('DialogFooter', ['theme'])
export class DialogFooterBase extends BaseComponent<any, any> {
  private _classNames: IClassNames<IDialogFooterStyles>;

  public render() {
    const { getStyles, theme } = this.props;

    this._classNames = getClassNames(getStyles!, {
      theme: theme!,
    });

    return (
      <div className={ this._classNames.actions }>
        <div className={ this._classNames.actionsRight }>
          { this._renderChildrenAsActions() }
        </div>
      </div>
    );
  }

  private _renderChildrenAsActions() {
    return React.Children.map(this.props.children, child =>
      child && <span className={ this._classNames.action }>{ child }</span>
    );
  }
}
