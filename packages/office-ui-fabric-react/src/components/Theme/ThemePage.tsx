import * as React from 'react';
import {
  classNamesFunction,
  customizable,
} from '../../Utilities';
import {
  FontClassNames,
  IPalette,
  ISemanticColors,
  loadTheme,
} from '../../Styling';
import {
  ComponentPage,
  Highlight,
  IComponentDemoPageProps,
  PageMarkdown,
} from '@uifabric/example-app-base';
import {
  IThemePagePalette,
  IThemePageStyleProps,
  IThemePageStyles,
  IThemePageState,
} from './ThemePage.types';
import {
  defaultPalette,
  defaultSemanticColors,
} from './defaultTheme';
import { getStyles } from './ThemePage.styles';
import { Callout } from '../Callout';
import { DetailsList, DetailsListLayoutMode } from '../../DetailsList';
import { SelectionMode } from '../../Selection';
import { ColorPicker } from '../ColorPicker';

const getClassNames = classNamesFunction<IThemePageStyleProps, IThemePageStyles>();

export class ThemePage extends React.Component<IComponentDemoPageProps, IThemePageState> {
  private _list: DetailsList;

  constructor(props: IComponentDemoPageProps) {
    super(props);

    this._onPickerDismiss = this._onPickerDismiss.bind(this);

    this.state = {
      palette: defaultPalette,
      semanticColors: defaultSemanticColors,
    };

    this._onColorChanged = this._onColorChanged.bind(this);
  }

  public render() {
    const thisTheme = loadTheme({});
    const thisSemanticColors = thisTheme.semanticColors;
    // console.log(thisTheme);
    return (
      <ComponentPage
        title='Themes'
        componentName='ThemeExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Theme'
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Theme/docs/ThemesOverview.md') }
          </PageMarkdown>
        }
        otherSections={ [
          {
            title: 'Default Palette',
            section: this._colorList(this.state.palette, 'palette')
          },
          {
            title: 'Default Semantic Colors',
            section: this._colorList(this.state.semanticColors, 'semanticColors')
          },
        ] }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

  private _colorList = (colors: any, list: 'palette' | 'semanticColors') => {
    const classNames = getClassNames(getStyles);
    const { colorPickerProps } = this.state;
    return (
      <div>
        <DetailsList
          componentRef={ this._createDetailsListRef }
          items={ colors }
          selectionMode={ SelectionMode.none }
          layoutMode={ DetailsListLayoutMode.fixedColumns }
          columns={ [
            {
              key: 'name',
              name: 'Name',
              fieldName: 'name',
              minWidth: 150,
              maxWidth: 150
            },
            {
              key: 'color',
              name: 'Color',
              fieldName: 'value',
              minWidth: 200,
              onRender: (item, index) => (
                <div
                  className={ classNames.colorSwatch }
                  data-is-focusable='true'
                  onClick={ (ev) => {
                    this._onSwatchClicked(item, index!, ev);
                    this.setState({ activeList: list });
                  } }
                >
                  <span
                    className={ classNames.swatch }
                    style={ { backgroundColor: item.value } }
                  />
                  <span className={ classNames.colorValue }>{ item.value }</span>
                </div>
              )
            },
            {
              key: 'desc',
              name: 'Description',
              fieldName: 'description',
              minWidth: 90
            }
          ] }
        />

        { colorPickerProps && (
          <Callout
            isBeakVisible={ false }
            gapSpace={ 10 }
            target={ colorPickerProps.targetElement }
            onDismiss={ this._onPickerDismiss }
          >

            <ColorPicker
              color={ colorPickerProps.value }
              onColorChanged={ this._onColorChanged.bind(this, colorPickerProps.index) }
            />

          </Callout>
        ) }

      </div>
    );
  }

  private _createDetailsListRef = (component: DetailsList) => {
    this._list = component;
  }

  private _onSwatchClicked(item: any, index: number, ev: React.MouseEvent<HTMLElement>) {
    this.setState({
      colorPickerProps: {
        targetElement: (ev.currentTarget as HTMLElement).children[0] as HTMLElement,
        value: item.value,
        index: index,
      }
    });
  }

  private _onColorChanged(
    index: number,
    newColor: string,
  ) {
    const { palette, semanticColors, activeList } = this.state;
    const partialPalette: Partial<IPalette> = {};
    const partialSemanticColors: Partial<ISemanticColors> = {};

    if (activeList === 'palette') {
      const paletteColor = palette[index];
      paletteColor.value = newColor;
      palette[index] = paletteColor;
      for (let i = 0; i < palette.length; i++) {
        (palette as any)[palette[i].key] = palette[i].value;
      }
    } else if (activeList === 'semanticColors') {
      const semanticColor = semanticColors[index];
      semanticColor.value = newColor;
      semanticColors[index] = semanticColor;
      for (let i = 0; i < semanticColors.length; i++) {
        (semanticColors as any)[semanticColors[i].key] = semanticColors[i].value;
      }
    } else {
      this.setState({ activeList: undefined });
      return undefined;
    }

    this.setState({ activeList: undefined });
    const partialTheme = { ...partialPalette, ...partialSemanticColors };

    loadTheme({ palette: partialTheme });

    // The theme has changed values, but color state is the same. Force an update on the list.
    this._list.forceUpdate();
  }

  private _onPickerDismiss() {
    this.setState({
      colorPickerProps: undefined
    });
  }
}
