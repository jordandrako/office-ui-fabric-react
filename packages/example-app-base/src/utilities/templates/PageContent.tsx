import * as React from 'react';
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

export interface IPageContentProps extends React.Props<PageContent>, IBaseProps {
  theme?: ITheme;
}

export interface IPageContentStyles {
  root: IStyle;
}

const getDefaultStyles = (props: IPageContentProps): IPageContentStyles => ({
  root: {
    padding: '20px'
  }
});

const getClassNames = classNamesFunction<IPageContentProps, IPageContentStyles>();

@customizable('PageContent', ['theme'])
export class PageContent extends BaseComponent<IPageContentProps, {}> {
  public render(): JSX.Element {
    const { children } = this.props;
    const classNames = getClassNames(
      getDefaultStyles!
    );

    return (
      <div className={ classNames.root }>
        { children }
      </div>
    );
  }
}
