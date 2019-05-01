import * as React from 'react';
import { Async, Icon, Image, Link, TooltipHost, classNamesFunction, registerIcons } from 'office-ui-fabric-react';
import { trackEvent, EventNames, getSiteArea } from '@uifabric/example-app-base/lib/index2';
import { platforms } from '../../SiteDefinition/SiteDefinition.platforms';
import { AndroidLogo, AppleLogo, WebLogo } from '../../utilities/index';
import { IHomePageProps, IHomePageStyles, IHomePageStyleProps } from './HomePage.types';

const getClassNames = classNamesFunction<IHomePageStyleProps, IHomePageStyles>();

registerIcons({
  icons: {
    'AndroidLogo-homePage': AndroidLogo({ iconColor: 'black', iconSize: 64 }),
    'AppleLogo-homePage': AppleLogo({ iconColor: 'black', iconSize: 64 }),
    'WebLogo-homePage': WebLogo({ iconColor: 'black', iconSize: 64 })
  }
});

/**
 * List of App/Brand icon names that use UI Fabric.
 */
const fabricUsageIconBaseUrl = 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product-fluent/svg/';
const fabricUsageIcons = [
  { src: fabricUsageIconBaseUrl + 'outlook_48x1.svg', title: 'Outlook' },
  { src: fabricUsageIconBaseUrl + 'onedrive_48x1.svg', title: 'OneDrive' },
  { src: fabricUsageIconBaseUrl + 'word_48x1.svg', title: 'Word' },
  { src: fabricUsageIconBaseUrl + 'excel_48x1.svg', title: 'Excel' },
  { src: fabricUsageIconBaseUrl + 'powerpoint_48x1.svg', title: 'PowerPoint' },
  { src: fabricUsageIconBaseUrl + 'onenote_48x1.svg', title: 'OneNote' },
  { src: fabricUsageIconBaseUrl + 'sharepoint_48x1.svg', title: 'SharePoint' },
  { src: fabricUsageIconBaseUrl + 'teams_48x1.svg', title: 'Teams' }
];

export interface IHomePageState {
  isMounted: boolean;
  isMountedOffset: boolean;
}

export class HomePageBase extends React.Component<IHomePageProps, IHomePageState> {
  public readonly state: IHomePageState = {
    isMounted: false,
    isMountedOffset: false
  };

  private _async = new Async();
  private _classNames: { [key in keyof IHomePageStyles]: string };

  public componentDidMount(): void {
    // Delay adding section transition styles after page is mounted.
    this._async.setTimeout(() => {
      this.setState({ isMounted: true }, () => {
        this._async.setTimeout(() => {
          this.setState({ isMountedOffset: true });
        }, 10);
      });
    }, 10);
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render() {
    const { isMountedOffset } = this.state;
    const { theme, styles } = this.props;

    this._classNames = getClassNames(styles, {
      theme,
      isMountedOffset
    });

    return (
      <div className={this._classNames.root}>
        {this._renderHeroSection()}
        {this._renderPlatformCardsSection()}
        {this._renderPlatformsSection()}
        {this._renderResourcesSection()}
        {this._renderUsageSection()}
      </div>
    );
  }

  private _renderHeroSection = (): JSX.Element => {
    return (
      <section className={this._classNames.heroSection}>
        <div className={this._classNames.sectionContent}>
          <div className={this._classNames.oneHalf}>
            <h2 className={this._classNames.heroTitle}>Create amazing experiences</h2>
          </div>
          <div className={this._classNames.oneFourth}>
            <p>
              Together, we’ve created Microsoft UI Fabric, a collection of UX frameworks you can use to build experiences that fit
              seamlessly into a broad range of Microsoft products.
            </p>
            <p>Connect with the cross-platform principles, experiences, styles and controls you need to do amazing things. </p>
            <p>{this._renderLink('#/get-started', 'Get started', false, true)}</p>
          </div>
        </div>
      </section>
    );
  };

  private _renderPlatformCardsSection = (): JSX.Element => {
    const { isMountedOffset } = this.state;
    const { theme, styles } = this.props;

    const platformKeys = Object.keys(platforms);
    const lastPlatform = platformKeys.length - 1;
    const beforeColor = platforms[platformKeys[0]].color;
    const afterColor = platforms[platformKeys[lastPlatform]].color;

    const classNames = getClassNames(styles, {
      theme,
      isMountedOffset,
      beforeColor,
      afterColor,
      isInverted: true
    });

    return (
      <div className={classNames.platformCardsSection}>
        <div className={classNames.inner}>
          <div className={classNames.card} style={{ background: platforms.web.color }}>
            <Icon iconName="WebLogo-homePage" className={classNames.cardIcon} />
            <h3 className={classNames.cardTitle}>Web</h3>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>
                {this._renderLink(
                  '#/experiences/web',
                  <>
                    Experiences <em>(coming soon)</em>
                  </>,
                  true
                )}
              </li>
              <li className={classNames.cardListItem}>{this._renderLink('#/styles/web', 'Styles')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/web', 'Controls')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/get-started/web', 'Get started')}</li>
            </ul>
          </div>
          <div className={classNames.card} style={{ background: platforms.ios.color }}>
            <Icon iconName="AppleLogo-homePage" className={classNames.cardIcon} />
            <h3 className={classNames.cardTitle}>iOS</h3>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>
                {this._renderLink(
                  '#/experiences/ios',
                  <>
                    Experiences <em>(coming soon)</em>
                  </>,
                  true
                )}
              </li>
              <li className={classNames.cardListItem}>
                {this._renderLink(
                  '#/styles/ios',
                  <>
                    Styles <em>(coming soon)</em>
                  </>,
                  true
                )}
              </li>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/ios', 'Controls')}</li>
            </ul>
          </div>
          <div className={classNames.card} style={{ background: platforms.android.color }}>
            <Icon iconName="AndroidLogo-homePage" className={classNames.cardIcon} />
            <h3 className={classNames.cardTitle}>Android</h3>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>
                {this._renderLink(
                  '#/experiences/android',
                  <>
                    Experiences <em>(coming soon)</em>
                  </>,
                  true
                )}
              </li>
              <li className={classNames.cardListItem}>
                {this._renderLink(
                  '#/styles/android',
                  <>
                    Styles <em>(coming soon)</em>
                  </>,
                  true
                )}
              </li>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/android', 'Controls')}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  private _renderPlatformsSection = (): JSX.Element => {
    const { isMountedOffset } = this.state;
    const { theme, styles } = this.props;

    // We need to get classNames within this method for offset transitions and inverted sections.
    const classNames = getClassNames(styles, {
      theme,
      isMountedOffset,
      isInverted: true
    });

    return (
      <section className={classNames.platformsSection}>
        <div className={classNames.sectionContent}>
          <div className={classNames.oneHalf}>
            <h2 className={classNames.platformsTitle}>Build across platforms</h2>
          </div>
          <div className={classNames.oneFourth}>
            <p>
              We're broadening our guidance to include more platforms and create an open source system, making it possible for us all to
              evolve together.
            </p>
          </div>
        </div>
      </section>
    );
  };

  private _renderResourcesSection = (): JSX.Element => {
    return (
      <section className={this._classNames.resourcesSection}>
        <div className={this._classNames.sectionContent}>
          <div className={this._classNames.oneHalf}>
            <div className={this._classNames.placeholder} />
          </div>
          <div className={this._classNames.oneFourth}>
            <h2 className={this._classNames.resourcesTitle}>Discover resources</h2>
            <p>Find design, inclusive and developer onboarding resources, and learn about how to become a contributor.</p>
            <p>{this._renderLink('#/resources', 'See resources')}</p>
          </div>
        </div>
      </section>
    );
  };

  private _renderUsageSection = (): JSX.Element => {
    return (
      <section className={this._classNames.usageSection}>
        <div className={this._classNames.sectionContent}>
          <div className={this._classNames.oneFourth}>
            <h2 className={this._classNames.usageTitle}>Who at Microsoft uses Fabric?</h2>
            <p>From Word, PowerPoint and Excel to PowerBI, many teams in Microsoft utilize the functionality of Fabric.</p>
          </div>
          <div className={this._classNames.oneFourth} />
          <figure className={this._classNames.oneHalf}>
            <ul className={this._classNames.usageIconList}>{this._renderUsageIconList()}</ul>
            <figcaption>
              <strong>+many additional Microsoft sites and products</strong>
            </figcaption>
          </figure>
        </div>
      </section>
    );
  };

  /**Renders a link with an icon */
  private _renderLink = (url: string, text: React.ReactNode, disabled?: boolean, isCTA?: boolean, icon = 'Forward'): JSX.Element => {
    return (
      <Link
        className={this._classNames.link}
        href={url}
        disabled={!!disabled}
        // tslint:disable-next-line jsx-no-lambda
        onClick={ev => (isCTA ? this._onCTAClick(ev) : this._onInternalLinkClick(ev, url))}
      >
        <Icon iconName={icon} className={this._classNames.linkIcon} />
        <span className={this._classNames.linkText}>{text}</span>
      </Link>
    );
  };

  /** Renders list of app/brand icons that use Fabric. */
  private _renderUsageIconList = (): JSX.Element[] => {
    return fabricUsageIcons.map((icon, iconIndex) => (
      <li key={iconIndex} className={this._classNames.usageIconListItem}>
        <TooltipHost content={icon.title} id={icon.title + iconIndex} styles={{ root: { display: 'inline-block' } }}>
          <Image
            src={icon.src}
            className={this._classNames.usageIcon}
            alt={`${icon.title} icon`}
            aria-describedby={icon.title + iconIndex}
          />
        </TooltipHost>
      </li>
    ));
  };

  private _onCTAClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>): void => {
    trackEvent(EventNames.ClickedGetStartedLink);
  };

  private _onInternalLinkClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>, url: string): void => {
    trackEvent(EventNames.ClickedInternalLink, {
      topic: url, // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(),
      nextArea: getSiteArea(url),
      nextPage: url,
      currentPage: window.location.hash
    });
  };
}
