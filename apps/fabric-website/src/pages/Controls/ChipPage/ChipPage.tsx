import * as React from 'react';
import { IPageSectionProps, Markdown } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ChipPageProps } from './ChipPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/ChipPage/';

export const ChipPage: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...ChipPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/ChipImplementation.md',
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ChipPage/docs/ios/ChipImplementation.md') as string}
            </Markdown>
          )
        }
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/ChipImplementation.md',
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ChipPage/docs/android/ChipImplementation.md') as string}
            </Markdown>
          )
        }
      ];
  }
}
