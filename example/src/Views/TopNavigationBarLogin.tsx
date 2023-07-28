import React from 'react';
import { StyleSheet, ScrollView, View, Alert, Text as ReactText } from 'react-native';
import { Text, NavigationButton, Checkbox, getColor, RadioButton, LinkProps, TopNavigationBarLoginProps, TopNavigationBarLogin, InlineLink } from '@carbon/react-native';
import MapIcon from '@carbon/icons/es/map/20';
import UserIcon from '@carbon/icons/es/user--avatar/20';

type SideOptions = 'none' | 'link' | 'one_button' | 'two_buttons';

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  view: {
    marginTop: 32,
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  appBreaker: {
    backgroundColor: getColor('tagBackgroundMagenta'),
    height: 20,
  },
  textSpacing: {
    marginTop: 16,
  },
  subTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subTitleText: {
    marginRight: 4,
    color: getColor('textOnColor'),
  },
});

export default class TestTopNavigationBarLogin extends React.Component {
  state = {
    rightSide: 'one_button' as SideOptions,
    showSubTitle: true,
    disableItems: false,
    activeIcon: false,
    showBack: true,
  };

  private getIcons(count: 1 | 2): NavigationButton[] {
    const { disableItems, activeIcon } = this.state;

    const icons = [
      {
        text: 'Map',
        icon: MapIcon,
        disabled: disableItems,
        active: activeIcon,
        onPress: () => {
          Alert.alert('Pressed map icon');
        },
      },
      {
        text: 'Account',
        icon: UserIcon,
        disabled: disableItems,
        onPress: () => {
          Alert.alert('Pressed account icon');
        },
      },
    ];

    return icons.slice(0, count);
  }

  private get rightLink(): LinkProps {
    const { disableItems } = this.state;

    return {
      onPress: () => Alert.alert('Right link pressed'),
      text: 'Right link',
      disabled: disableItems,
    };
  }

  private get navigationProps(): TopNavigationBarLoginProps {
    const { rightSide, showSubTitle, showBack } = this.state;

    return {
      title: 'Log in to IBM Product Name',
      subTitle: showSubTitle ? (
        <ReactText>
          <Text style={styles.subTitleText} text="Don't have an account? " />
          <InlineLink text="Create an account" forceDarkMode={true} onPress={() => Alert.alert('Create account pressed')} />
        </ReactText>
      ) : undefined,
      rightLink: rightSide === 'link' ? this.rightLink : undefined,
      rightItems: rightSide === 'one_button' || rightSide === 'two_buttons' ? this.getIcons(rightSide === 'one_button' ? 1 : 2) : undefined,
      backText: showBack ? 'Back' : undefined,
      backOnPress: showBack ? () => Alert.alert('Back link pressed') : undefined,
    };
  }

  render(): React.ReactNode {
    const { rightSide, showSubTitle, disableItems, activeIcon, showBack } = this.state;

    return (
      <View style={styles.parentView}>
        <View style={styles.appBreaker} />
        <TopNavigationBarLogin {...this.navigationProps} />
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
          <Text style={styles.textSpacing} type="label-02" text="Right side setup" />
          <RadioButton checked={rightSide === 'none'} id="none" label="Nothing" onPress={() => this.setState({ rightSide: 'none' })} />
          <RadioButton checked={rightSide === 'link'} id="link" label="Link" onPress={() => this.setState({ rightSide: 'link' })} />
          <RadioButton checked={rightSide === 'one_button'} id="one_button" label="One button" onPress={() => this.setState({ rightSide: 'one_button' })} />
          <RadioButton checked={rightSide === 'two_buttons'} id="two_buttons" label="Two buttons" onPress={() => this.setState({ rightSide: 'two_buttons' })} />
          <Checkbox checked={showSubTitle} id="showSubTitle" label="Show sub title" onPress={(value) => this.setState({ showSubTitle: value })} />
          <Checkbox checked={showBack} id="showBack" label="Show back button" onPress={(value) => this.setState({ showBack: value })} />
          <Checkbox checked={disableItems} id="disableItems" label="Disable right links and icons" onPress={(value) => this.setState({ disableItems: value })} />
          <Checkbox checked={activeIcon} id="activeIcon" label="Make first icon active" onPress={(value) => this.setState({ activeIcon: value })} />
        </ScrollView>
      </View>
    );
  }
}
