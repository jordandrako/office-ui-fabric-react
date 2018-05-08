import * as React from 'react';
import * as Fabric from 'office-ui-fabric-react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

export interface ILiveCodeProps {
  code: string;
  scope?: {};
  mountStylesheet?: boolean;
  noInline?: boolean;
  transformCode?: () => void;
  editor?: {
    className?: string;
    ignoreTabKey?: boolean;
    style?: {};
    onChange?: () => void;
  };
}
export class LiveCode extends React.Component<ILiveCodeProps, {}> {
  constructor(props: ILiveCodeProps) {
    super(props);
  }
  public render(): JSX.Element {
    const {
      code,
      scope,
      mountStylesheet,
      noInline,
      transformCode
    } = this.props;

    return (
      <LiveProvider code={ code } scope={ { Fabric, ...scope } } mountStylesheet={ mountStylesheet } >
        <LiveEditor {...this.props.editor} />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
}