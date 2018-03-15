import * as React from 'react';
import {
  BaseComponent,
  IBaseProps,
  classNamesFunction,
  customizable
} from 'office-ui-fabric-react/lib/Utilities';
import {
  ITheme,
  IStyle,
} from 'office-ui-fabric-react/lib/Styling';

export interface IPageParagraphProps extends React.Props<PageParagraph>, IBaseProps {
  theme?: ITheme;
}

export interface IPageParagraphStyles {
  root: IStyle;
}

export interface IPageParagraphStyleProps {
  theme: ITheme;
  isTodo: boolean;
}

const getClassNames = classNamesFunction<IPageParagraphStyleProps, IPageParagraphStyles>();

const getDefaultStyles = (props: IPageParagraphStyleProps): IPageParagraphStyles => ({
  root: [
    props.theme.fonts.medium,
    {
      marginBottom: 4
    },
    props.isTodo && {
      padding: 8,
      background: props.theme.semanticColors.warningBackground
    }
  ]
});

@customizable('PageParagraph', ['theme'])
export class PageParagraph extends BaseComponent<IPageParagraphProps, {}> {
  public render(): JSX.Element {
    const { children, theme } = this.props;
    const styleProps: IPageParagraphStyleProps = {
      theme: theme!,
      isTodo: typeof children === 'string' && children.indexOf('TODO') === 0
    };

    const classNames = getClassNames(
      getDefaultStyles!,
      styleProps
    );

    return (
      <p className={ classNames.root }>
        { children }
      </p>
    );
  }
}
