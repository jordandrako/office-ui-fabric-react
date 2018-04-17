import { IStyle, keyframes } from '../../Styling';
import { IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types';

export const getStyles = (
  props: IProgressIndicatorStyleProps
): IProgressIndicatorStyles => {
  const {
    className,
    theme,
    indeterminate,
    smoothTransition,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-ProgressIndicator',
      {},
      className
    ],

    itemName: [
      'ms-ProgressIndicator-itemName',
      {}
    ],

    itemDescription: [
      'ms-ProgressIndicator-itemDescription',
      {}
    ],

    itemProgress: [
      'ms-ProgressIndicator-itemProgress',
      {}
    ],

    progressTrack: [
      'ms-ProgressIndicator-progressTrack',
      {}
    ],

    progressBar: [
      'ms-ProgressIndicator-progressBar',
      {},
    ],
  });
};