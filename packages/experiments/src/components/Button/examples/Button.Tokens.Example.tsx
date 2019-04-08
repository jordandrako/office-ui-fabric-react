import * as React from 'react';
import { Button, IButtonProps, MenuButton, IMenuButtonProps } from '@uifabric/experiments';
import { createTheme, Spinner, Stack } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: IMenuButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  buttonStack: {
    childrenGap: 8
  }
};

const testTheme = createTheme({
  semanticColors: {
    buttonText: 'red'
  },
  fonts: {
    medium: {
      color: 'purple'
    }
  }
});

// tslint:disable:jsx-no-lambda
export class ButtonTokensExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const ButtonSet = (props: IButtonProps) => (
      <Stack horizontal disableShrink verticalAlign="center" tokens={tokens.buttonStack}>
        <Button {...props} />
        <Button {...props} primary />
        <Button {...props} disabled />
        <Button
          {...props}
          tokens={{
            backgroundColor: 'red',
            backgroundColorHovered: 'pink',
            color: 'white',
            colorHovered: 'white',
            iconColor: 'white',
            iconColorHovered: 'white'
          }}
        />
      </Stack>
    );

    const MenuButtonSet = (props: IMenuButtonProps) => (
      <Stack horizontal disableShrink verticalAlign="center" tokens={tokens.buttonStack}>
        <MenuButton {...props} />
        <MenuButton {...props} primary />
        <MenuButton {...props} disabled />
        <MenuButton
          {...props}
          tokens={{
            backgroundColor: 'red',
            backgroundColorHovered: 'pink',
            color: 'white',
            colorHovered: 'white',
            iconColor: 'white',
            iconColorHovered: 'white'
          }}
        />
      </Stack>
    );

    return (
      <Stack tokens={tokens.sectionStack}>
        <ButtonSet />
        <ButtonSet content="No Icon" />
        <ButtonSet content={<Spinner />} />
        <ButtonSet icon="upload" content="Button with Icon" />
        <ButtonSet icon="upload" href="http://www.microsoft.com" content="Button with href" />
        <ButtonSet circular />
        <ButtonSet circular icon="share" />
        <MenuButtonSet
          icon={render => render((IconType, iconProps) => <IconType {...iconProps} iconName="upload" />)}
          content="Menu button with icon"
          menu={buttonMenu}
        />
        <Stack horizontal disableShrink verticalAlign="center" tokens={tokens.buttonStack}>
          <Button
            primary
            icon="PeopleAdd"
            content="Token Function: Red BG, White Text"
            tokens={(props, theme) =>
              props.primary && {
                backgroundColor: 'red',
                backgroundColorHovered: 'pink',
                color: 'white',
                colorHovered: 'white',
                iconColor: 'white',
                iconColorHovered: 'white'
              }
            }
          />
          <Button
            icon="PeopleAdd"
            content="Token Function: Red Icon (via theme), Purple Text"
            theme={testTheme}
            tokens={(props, theme) => ({
              color: theme.fonts.medium.color
            })}
          />
        </Stack>
      </Stack>
    );
  }
}
