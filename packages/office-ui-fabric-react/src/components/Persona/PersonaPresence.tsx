import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  styled,
} from '../../Utilities';
import { Icon } from '../../Icon';
import {
  IPersonaProps,
  IPersonaStyleProps,
  IPersonaStyles,
  PersonaPresence as PersonaPresenceEnum,
} from './Persona.types';
import { getStyles } from './Persona.styles';

const coinSizeFontScaleFactor = 6;
const coinSizePresenceScaleFactor = 3;
const presenceMaxSize = 40;
const presenceFontMaxSize = 20;

const getClassNames = classNamesFunction<IPersonaStyleProps, IPersonaStyles>();

@customizable('PersonaPresence', ['theme'])
export class PersonaPresenceBase extends BaseComponent<IPersonaProps, {}> {
  constructor(props: IPersonaProps) {
    super(props);
  }

  public render(): JSX.Element | null {
    const {
      coinSize,
      presence,
      theme,
    } = this.props;

    const presenceHeightWidth = coinSize && (coinSize / coinSizePresenceScaleFactor < presenceMaxSize ? coinSize / coinSizePresenceScaleFactor : presenceMaxSize);
    const presenceFontSize = coinSize && (coinSize / coinSizeFontScaleFactor < presenceFontMaxSize ? coinSize / coinSizeFontScaleFactor : presenceFontMaxSize);
    const coinSizeWithPresenceIconStyle = coinSize ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth + 'px' } : undefined;
    const coinSizeWithPresenceStyle = coinSize ? { width: presenceHeightWidth, height: presenceHeightWidth } : undefined;

    const classNames = getClassNames(getStyles!, {
      theme: theme!,
      presence,
    });

    if (presence === PersonaPresenceEnum.none) {
      return null;
    }

    return (
      <div
        className={ classNames.presence }
        style={ coinSizeWithPresenceStyle }
      >
        <Icon
          className={ classNames.presenceIcon }
          iconName={ this._determineIcon() }
          style={ coinSizeWithPresenceIconStyle }
        />
      </div>
    );
  }

  private _determineIcon = (): string | undefined => {
    const { presence } = this.props;

    if (presence !== PersonaPresenceEnum.none) {
      let userPresence = PersonaPresenceEnum[presence as PersonaPresenceEnum];

      switch (userPresence) {
        case 'online':
          userPresence = 'SkypeCheck';
          break;
        case 'away':
          userPresence = 'SkypeClock';
          break;
        case 'dnd':
          userPresence = 'SkypeMinus';
          break;
        default:
          userPresence = '';
      }

      return userPresence;
    }
  }
}

export const PersonaPresence = styled<IPersonaProps, IPersonaStyleProps, IPersonaStyles>(
  PersonaPresenceBase,
  getStyles
);
