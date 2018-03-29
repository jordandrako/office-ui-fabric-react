import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  divProperties,
  getInitials,
  getNativeProps,
  getRTL,
  styled,
} from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { PersonaPresence } from './PersonaPresence';
import {
  Icon
} from '../../Icon';
import {
  Image,
  ImageFit,
  ImageLoadState
} from '../../Image';
import {
  IPersonaCoinProps,
  IPersonaCoinStyleProps,
  IPersonaCoinStyles,
  IPersonaPresenceProps,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize,
} from './Persona.types';
import { initialsColorPropToColorCode } from './PersonaInitialsColor';
import { getStyles } from './PersonaCoin.styles';

const getClassNames = classNamesFunction<IPersonaCoinStyleProps, IPersonaCoinStyles>();

const SIZE_TO_PIXELS: { [key: number]: number } = {
  [PersonaSize.tiny]: 20,
  [PersonaSize.extraExtraSmall]: 24,
  [PersonaSize.extraSmall]: 28,
  [PersonaSize.small]: 40,
  [PersonaSize.regular]: 48,
  [PersonaSize.large]: 72,
  [PersonaSize.extraLarge]: 100,

  [PersonaSize.size24]: 24,
  [PersonaSize.size28]: 28,
  [PersonaSize.size10]: 20,
  [PersonaSize.size32]: 32,
  [PersonaSize.size40]: 40,
  [PersonaSize.size48]: 48,
  [PersonaSize.size72]: 72,
  [PersonaSize.size100]: 100
};

export interface IPersonaState {
  isImageLoaded?: boolean;
  isImageError?: boolean;
}

// Export themeable PersonaCoinBase
@customizable('PersonaCoin', ['theme'])
export class PersonaCoinBase extends BaseComponent<IPersonaCoinProps, IPersonaState> {
  public static defaultProps: IPersonaCoinProps = {
    primaryText: '',
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: '',
  };

  constructor(props: IPersonaCoinProps) {
    super(props);

    this.state = {
      isImageLoaded: false,
      isImageError: false
    };
  }

  public render(): JSX.Element | null {
    const {
      className,
      coinProps,
      coinSize,
      getStyles: getStylesProp, // Use getStyles from props.
      imageUrl,
      onRenderCoin = this._onRenderCoin,
      onRenderInitials = this._onRenderInitials,
      presence,
      theme,
    } = this.props;

    const size = this.props.size as PersonaSize;
    const divProps = getNativeProps(this.props, divProperties);
    const coinSizeStyle = coinSize ? { width: coinSize, height: coinSize } : undefined;

    const personaPresenceProps: IPersonaPresenceProps = {
      coinSize,
      presence,
      theme,
      size,
    };

    // Use getStyles from props, or fall back to getStyles from styles file.
    const classNames = getClassNames(getStylesProp || getStyles, {
      theme: theme!,
      className: (coinProps && coinProps.className) ? coinProps.className : className,
      size,
    });

    return (
      <div
        { ...divProps }
        className={ classNames.coin }
      >

        { // Render PersonaCoin if size is not size10
          (size !== PersonaSize.size10 && size !== PersonaSize.tiny)
            ? (
              <div
                { ...coinProps }
                className={ classNames.imageArea }
                style={ coinSizeStyle }
              >
                {
                  !this.state.isImageLoaded &&
                  (!imageUrl || this.state.isImageError) &&
                  (
                    <div
                      className={ mergeStyles(
                        classNames.initials,
                        {
                          backgroundColor: initialsColorPropToColorCode(this.props)
                        }
                      ) }
                      style={ coinSizeStyle }
                      aria-hidden='true'
                    >
                      { onRenderInitials(this.props, this._onRenderInitials) }
                    </div>
                  )
                }
                { onRenderCoin(this.props, this._onRenderCoin) }
                <PersonaPresence { ...personaPresenceProps } />
              </div>
            ) : ( // Otherwise, render just PersonaPresence.
              this.props.presence
                ? <PersonaPresence { ...personaPresenceProps } />
                : // Just render Contact Icon if there isn't a Presence prop.
                <Icon
                  iconName='Contact'
                  className={ classNames.size10WithoutPresenceIcon }
                />
            )
        }
        { this.props.children }
      </div>
    );
  }

  private _onRenderCoin = (props: IPersonaCoinProps): JSX.Element | null => {
    const {
      coinSize,
      getStyles: getStylesProp,
      imageUrl,
      imageAlt,
      imageShouldFadeIn,
      imageShouldStartVisible,
      theme,
    } = this.props;

    const size = this.props.size as PersonaSize;

    const classNames = getClassNames(getStylesProp! || getStyles!, {
      theme: theme!,
      size
    });

    return (
      <Image
        className={ classNames.image }
        imageFit={ ImageFit.cover }
        src={ imageUrl }
        width={ coinSize || SIZE_TO_PIXELS[size] }
        height={ coinSize || SIZE_TO_PIXELS[size] }
        alt={ imageAlt }
        shouldFadeIn={ imageShouldFadeIn }
        shouldStartVisible={ imageShouldStartVisible }
        onLoadingStateChange={ this._onPhotoLoadingStateChange }
      />
    );
  }

  private _onRenderInitials = (props: IPersonaCoinProps): JSX.Element => {
    let { imageInitials } = props;
    const {
      allowPhoneInitials,
      primaryText,
    } = props;

    const isRTL = getRTL();

    imageInitials = imageInitials || getInitials(primaryText, isRTL, allowPhoneInitials);

    return (
      imageInitials !== ''
        ? <span>{ imageInitials }</span>
        : <Icon iconName='Contact' />
    );
  }

  private _onPhotoLoadingStateChange = (loadState: ImageLoadState) => {
    this.setState({
      isImageLoaded: loadState === ImageLoadState.loaded,
      isImageError: loadState === ImageLoadState.error
    });

    this.props.onPhotoLoadingStateChange && this.props.onPhotoLoadingStateChange(loadState);
  }
}

// Export styled PersonaCoin
export const PersonaCoin = styled<IPersonaCoinProps, IPersonaCoinStyleProps, IPersonaCoinStyles>(
  PersonaCoinBase,
  getStyles
);