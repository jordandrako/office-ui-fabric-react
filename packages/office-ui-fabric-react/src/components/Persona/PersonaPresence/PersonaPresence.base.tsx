import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
} from '../../../Utilities';
import { IStyleSet } from '../../../Styling';
import { Icon } from '../../Icon';
import {
  IPersonaPresenceProps,
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize,
  sizeBoolean,
} from '../Persona.types';

const coinSizeFontScaleFactor = 6;
const coinSizePresenceScaleFactor = 3;
const presenceMaxSize = 40;
const presenceFontMaxSize = 20;

const getClassNames = classNamesFunction<IPersonaPresenceStyleProps, IPersonaPresenceStyles>();

/**
 * PersonaPresence with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
@customizable('PersonaPresence', ['theme'])
export class PersonaPresenceBase extends BaseComponent<IPersonaPresenceProps, {}> {
  public static defaultProps = {
    presenceDescriptors: {
      [PersonaPresenceEnum.offline]: 'Offline',
      [PersonaPresenceEnum.online]: 'Available',
      [PersonaPresenceEnum.away]: 'Away',
      [PersonaPresenceEnum.dnd]: 'Do Not Disturb',
      [PersonaPresenceEnum.blocked]: 'Blocked',
      [PersonaPresenceEnum.busy]: 'Busy',
    },
  };

  constructor(props: IPersonaPresenceProps) {
    super(props);
  }

  public render(): JSX.Element | null {
    const {
      coinSize,
      getStyles,
      presenceDescriptors,
      theme,
    } = this.props;
    const size = sizeBoolean(this.props.size as PersonaSize);
    const presence = this.props.presence as PersonaPresenceEnum;

    // Render Presence Icon if Persona is above size 32.
    const renderIcon = !(size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && (coinSize ? coinSize > 32 : true);

    const presenceHeightWidth: string = coinSize ? (coinSize / coinSizePresenceScaleFactor < presenceMaxSize ? coinSize / coinSizePresenceScaleFactor + 'px' : presenceMaxSize + 'px') : '';
    const presenceFontSize: string = coinSize ? (coinSize / coinSizeFontScaleFactor < presenceFontMaxSize ? coinSize / coinSizeFontScaleFactor + 'px' : presenceFontMaxSize + 'px') : '';
    const coinSizeWithPresenceIconStyle = coinSize ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth } : undefined;
    const coinSizeWithPresenceStyle = coinSize ? { width: presenceHeightWidth, height: presenceHeightWidth } : undefined;

    // Use getStyles from props, or fall back to getStyles from styles file.
    const classNames = getClassNames(getStyles, {
      theme: theme!,
      presence,
      size: this.props.size,
    });

    if (presence === PersonaPresenceEnum.none) {
      return null;
    }

    return (
      <div
        className={ classNames.presence }
        style={ coinSizeWithPresenceStyle }
        title={ presenceDescriptors![presence] }
      >
        { renderIcon && this._onRenderIcon(classNames.presenceIcon, coinSizeWithPresenceIconStyle) }
      </div>
    );
  }

  private _onRenderIcon = (className?: string, styles?: IStyleSet): JSX.Element => (
    <Icon
      className={ className }
      iconName={ this._determineIcon() }
      style={ styles }
    />
  )

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
