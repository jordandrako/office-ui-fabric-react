import { IModalStyleProps, IModalStyles } from './Modal.types';
import { IOverlayStyles } from '../../Overlay';
import { AnimationVariables, getGlobalClassNames, HighContrastSelector } from '../../Styling';

export const animationDuration = AnimationVariables.durationValue2;

export const getOverlayStyles: IOverlayStyles = {
  root: {
    selectors: {
      [HighContrastSelector]: {
        opacity: 0
      }
    }
  }
};

const globalClassNames = {
  root: 'ms-Modal',
  main: 'ms-Dialog-main',
  isOpen: 'is-open'
};

export const getStyles = (props: IModalStyleProps): IModalStyles => {
  const { className, containerClassName, isOpen, isVisible, theme } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        backgroundColor: 'transparent',
        position: 'fixed',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration}`
      },
      isOpen && classNames.isOpen,
      isVisible && {
        opacity: 1,
        pointerEvents: 'auto'
      },
      className
    ],
    main: [
      classNames.main,
      {
        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
        backgroundColor: palette.white,
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'left',
        outline: '3px solid tranparent',
        maxHeight: '100%',
        overflowY: 'auto'
      },
      containerClassName
    ]
  };
};
