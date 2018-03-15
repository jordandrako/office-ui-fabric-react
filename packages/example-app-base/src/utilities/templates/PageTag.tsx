import {
  BaseComponent,
  IBaseProps,
  classNamesFunction,
  customizable,
} from 'office-ui-fabric-react/lib/Utilities';
import {
  ITheme,
  IStyle,
} from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { TypeScriptSnippet } from './TypeScriptSnippet';

export interface IPageTagProps extends React.Props<PageTag>, IBaseProps {
  theme?: ITheme;
  className?: string;
}

export interface IPageTagStyles {
  root: IStyle;
}

export interface IPageTagStyleProps {
  theme: ITheme;
}

const getDefaultStyles = (props: IPageTagStyleProps): IPageTagStyles => ({
  root: {
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '0 4px',
    background: props.theme.palette.neutralLighter,
    border: '1px solid',
    borderColor: props.theme.palette.neutralLight,
    borderRadius: 3
  }
});

const getClassNames = classNamesFunction<IPageTagStyleProps, IPageTagStyles>();

@customizable('PageTag', ['theme'])
export class PageTag extends BaseComponent<IPageTagProps, {}> {
  public render(): JSX.Element {
    const { children, theme, className } = this.props;
    const styleProps: IPageTagStyleProps = { theme: theme! };
    const classNames = getClassNames(
      getDefaultStyles!,
      styleProps
    );

    if (className !== undefined) {
      return <TypeScriptSnippet { ...this.props } />;
    }

    return (
      <span className={ classNames.root }>{ children }</span>
    );
  }
}
