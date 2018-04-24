import { IPivotStyleProps, IPivotStyles } from './Pivot.types';
import {
  normalize,
  FontSizes,
  FontWeights,
  AnimationVariables,
  HighContrastSelector,
  getFocusStyle,
} from '../../Styling';

export const getStyles = (
  props: IPivotStyleProps
): IPivotStyles => {
  const {
    className,
    theme,
    linkIsDisabled,
    linkIsOverflow,
    linkIsSelected,
    rootIsLarge,
    rootIsTabs,
  } = props;

  const { palette, semanticColors } = theme;

  const sharedTextCount = {
    display: 'inline-block',
    verticalAlign: 'top',
  };

  return ({
    root: [
      'ms-Pivot',
      normalize,
      {
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular,
        position: 'relative',
        color: palette.themePrimary,
        whiteSpace: 'nowrap',
      },
      className
    ],

    links: [
      'ms-Pivot-links',
      {
        fontSize: 0,
        height: 40,
        listStyleType: 'none',
        padding: 0,
        whiteSpace: 'nowrap',
      }
    ],

    link: [
      'ms-Pivot-link',
      {
        color: semanticColors.buttonText,
        display: 'inline-block',
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular,
        lineHeight: 40,
        marginRight: 8,
        padding: '0 8px',
        textAlign: 'center',
        position: 'relative',
        backgroundColor: 'transparent',
        border: 0,

        selectors: {
          ':hover': {
            cursor: 'pointer',
          },

          ':focus': {
            outline: 'none',
          },

          '.ms-Fabric--isFocusVisible &': {
            selectors: {
              ':focus': {
                outline: `1px solid ${palette.neutralSecondary}`
              }
            }
          },

          ':before': {
            backgroundColor: 'transparent',
            bottom: 0,
            content: '""',
            height: 2,
            left: 8,
            right: 8,
            position: 'absolute',
            transition: `background-color ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2}`
          },

          ':after': {
            color: 'transparent',
            content: 'attr(title)',
            display: 'block',
            fontWeight: 'bold',
            height: 1,
            overflow: 'hidden',
            visibility: 'hidden',
          },

          '$text': [
            sharedTextCount,
          ],

          '$count': [
            sharedTextCount,
            {
              marginLeft: 4,
            }
          ],

          '$text + $count': { // does this work?
            marginLeft: 4,
          }
        }
      },

      linkIsSelected && [
        {
          fontWeight: FontWeights.semibold,

          selectors: {
            ':before': {
              boxSizing: 'border-box',
              borderBottom: `2px solid ${palette.themePrimary}`,

              selectors: {
                [HighContrastSelector]: {
                  borderBottomColor: 'WindowText',
                }
              }
            }
          }
        }
      ],

      linkIsDisabled && [
        {
          color: palette.neutralTertiary,
        }
      ],

      rootIsLarge && [
        {
          fontSize: FontSizes.large,
        },

        linkIsOverflow && [
          {
            selectors: {
              ':after': {
                fontSize: FontSizes.large,
              }
            }
          }
        ]
      ],

      rootIsTabs && [
        getFocusStyle(theme),
        {
          marginRight: 0,
          height: 40,
          lineHeight: 40,
          backgroundColor: palette.neutralLighter,
          padding: '0 10px',
          verticalAlign: 'top',

          selectors: {
            ':active': {
              color: palette.white,
              backgroundColor: palette.themePrimary,
            },

            '.ms-Fabric--isFocusVisible &': {
              selectors: {
                ':focus': {
                  height: 'auto',
                  background: 'transparent',
                  transition: 'none',
                }
              }
            }
          }
        },

        !linkIsSelected && !linkIsOverflow && {
          selectors: {
            ':hover, :focus': {
              color: palette.black,
              zIndex: 1,
            }
          }
        },

        linkIsSelected && {
          backgroundColor: palette.themePrimary,
          color: palette.white,
          fontWeight: FontWeights.semilight,

          selectors: {
            ':before': {
              backgroundColor: 'transparent',
              transition: 'none',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              content: '""',
              height: 'auto',
            },

            [HighContrastSelector]: {
              color: 'HighlightText',
              background: 'Highlight',
              MsHighContrastAdjust: 'none',
              fontWeight: FontWeights.semibold,
            }
          }
        }
      ],

      linkIsOverflow && [
        {
          selectors: {
            ':active': {
              backgroundColor: palette.themePrimary,
            }
          }
        },

        !linkIsSelected && [
          {
            selectors: {
              ':hover, :focus': {
                backgroundColor: palette.white,
              }
            }
          }
        ]
      ]
    ],

    text: [
      'ms-Pivot-text',
      {}
    ],

    count: [
      'ms-Pivot-count',
      {}
    ],

    icon: [
      'ms-Pivot-icon',
      {}
    ],

    ellipsis: [
      'ms-Pivot-ellipsis',
      {
        fontSize: FontSizes.mediumPlus,
        position: 'relative',
        top: 0,
      }
    ],

  });
};