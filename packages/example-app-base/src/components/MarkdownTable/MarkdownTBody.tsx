import * as React from 'react';
import { classNamesFunction, styled } from 'office-ui-fabric-react';
import { IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles } from './MarkdownTable.types';
import { getStyles } from './MarkdownTable.styles';
// import * as styles from './MarkdownTable.module.scss';

const getClassNames = classNamesFunction<IMarkdownTableStyleProps, IMarkdownTableStyles>();

export class MarkdownTBodyBase extends React.Component<IMarkdownTableProps> {
  public render(): JSX.Element {
    const { children, styles, theme } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!
    });

    return (
      <tbody {...this.props} className={classNames.tbody}>
        {children}
      </tbody>
    );
  }
}

export const MarkdownTBody = styled<IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles>(
  MarkdownTBodyBase,
  getStyles,
  undefined,
  { scope: 'MarkdownTBody' }
);
