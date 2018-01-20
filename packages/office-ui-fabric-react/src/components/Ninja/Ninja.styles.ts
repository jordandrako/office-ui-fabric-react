import { IStyle } from '../../Styling';

export interface INinjaStyleProps {
  isTestProp: boolean;
}

export interface INinjaStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
}

export function getStyles(props: INinjaStyleProps): INinjaStyles {
  return {
    root: props.isTestProp && {
      backgroundColor: '#333',
      color: '#e7e7e7',
      padding: '.5em',
      opacity: 0,
      transition: 'all .2s ease-in-out',

      selectors: {
        ':hover': {
          opacity: 1
        }
      }
    }
  };
}
