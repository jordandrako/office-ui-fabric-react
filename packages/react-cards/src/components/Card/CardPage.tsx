import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PageMarkdown, PropertiesTableSet } from '@uifabric/example-app-base';

import { CardBasicExample } from './examples/Card.Basic.Example';
const CardBasicExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Basic.Example.tsx') as string;

import { CardCompactExample } from './examples/Card.Compact.Example';
const CardCompactExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Compact.Example.tsx') as string;

export class CardPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Card"
        componentName="Card"
        exampleCards={
          <div>
            <ExampleCard title="Basic Card" code={CardBasicExampleCode}>
              <CardBasicExample />
            </ExampleCard>
            <ExampleCard title="Compact Card" code={CardCompactExampleCode}>
              <CardCompactExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/Card.types.ts')]} />
        }
        overview={
          <PageMarkdown>{require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardOverview.md')}</PageMarkdown>
        }
        bestPractices={<div />}
        dos={<PageMarkdown>{require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardDos.md')}</PageMarkdown>}
        donts={<PageMarkdown>{require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardDonts.md')}</PageMarkdown>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
