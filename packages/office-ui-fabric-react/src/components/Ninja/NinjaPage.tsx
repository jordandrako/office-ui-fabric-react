import * as React from 'react';
import { ComponentPage, ExampleCard } from '@uifabric/example-app-base';

import { NinjaExample } from './examples/Ninja.Example';
const NinjaExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Ninja/examples/Ninja.Example.tsx') as string;

export class NinjaPage extends React.Component<{}, {}> {
  public render() {
    return (
      <ComponentPage
        title='Ninja 🐱‍👤'
        componentName='Ninja'
        overview={
          <p>This is our overview of the Ninja component.</p>
        }
        exampleCards={
          <div>
            <ExampleCard
              title='Ninja kitty'
              code={ NinjaExampleCode }
            >
              <NinjaExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}