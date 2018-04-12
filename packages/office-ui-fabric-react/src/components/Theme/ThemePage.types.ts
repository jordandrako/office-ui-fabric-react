import * as React from 'react';
import { IStyle } from '../../Styling';

export type IThemePagePalette = {
  key: string;
  name: string;
  value: string;
  description: string;
};

export interface IThemePageState {
  palette: {
    key: string;
    name: string;
    value: string;
    description: string;
  }[];

  semanticColors: {
    key: string;
    name: string;
    value: string;
    description: string;
  }[];

  colorPickerProps?: {
    targetElement: HTMLElement;
    value: any;
    index: number;
  };

  activeList?: string;
}

export interface IThemePageStyleProps { }

export interface IThemePageStyles {
  colorSwatch: IStyle;
  swatch: IStyle;
  colorValue: IStyle;
}