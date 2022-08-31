import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Text, NavigationButton, Checkbox, TopNavigationBar, getColor, RadioButton, LinkProps, TopNavigationBarProps, Search, ContentSwitcher, styleReferenceBreaker } from 'carbon-react-native';
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
  switchDivider: {
    marginBottom: 16,
  },
  textSpacing: {
    marginTop: 16,
  },
  searchBox: {
    paddingTop: 0,
  },
});

export default class TestTopNavigationBar extends React.Component {
  state = {
    leftSide: 'link' as SideOptions,
    rightSide: 'one_button' as SideOptions,
    showSubTitle: true,
    headingMode: false,
    showSearchBox: false,
    showSwitch: false,
    disableItems: false,
    activeIcon: false,
    searchValue: '',
    currentSwitchIndex: 0,
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

  private get leftLink(): LinkProps {
    const { disableItems } = this.state;

    return {
      onPress: () => Alert.alert('Left link pressed'),
      text: 'Left link',
      disabled: disableItems,
    };
  }

  private get rightLink(): LinkProps {
    const { disableItems } = this.state;

    return {
      onPress: () => Alert.alert('Right link pressed'),
      text: 'Right link',
      disabled: disableItems,
    };
  }

  private get additionalContent(): React.ReactNode {
    const { showSearchBox, showSwitch, searchValue, currentSwitchIndex } = this.state;

    return (
      <>
        {showSearchBox && <Search value={searchValue} onChangeText={(value) => this.setState({ searchValue: value })} placeholder="Search input text" style={styleReferenceBreaker(styles.searchBox, showSwitch ? styles.switchDivider : undefined)} light={true} />}
        {showSwitch && <ContentSwitcher items={[{ text: 'Item 1' }, { text: 'Item 2' }]} onChange={(index) => this.setState({ currentSwitchIndex: index })} selectedIndex={currentSwitchIndex} />}
      </>
    );
  }

  private get navigationProps(): TopNavigationBarProps {
    const { leftSide, rightSide, showSubTitle, headingMode, showSearchBox, showSwitch } = this.state;

    return {
      title: 'Navigation title',
      subTitle: showSubTitle && !headingMode ? 'Navigation sub title' : undefined,
      headerMode: headingMode,
      leftLink: leftSide === 'link' ? this.leftLink : undefined,
      rightLink: rightSide === 'link' ? this.rightLink : undefined,
      leftItems: leftSide === 'one_button' || leftSide === 'two_buttons' ? this.getIcons(leftSide === 'one_button' ? 1 : 2) : undefined,
      rightItems: rightSide === 'one_button' || rightSide === 'two_buttons' ? this.getIcons(rightSide === 'one_button' ? 1 : 2) : undefined,
      additionalHeaderContent: !!(showSearchBox || showSwitch) && this.additionalContent,
    };
  }

  render(): React.ReactNode {
    const { leftSide, rightSide, showSubTitle, headingMode, showSearchBox, showSwitch, disableItems, activeIcon } = this.state;

    return (
      <View style={styles.parentView}>
        <View style={styles.appBreaker} />
        <TopNavigationBar {...this.navigationProps} />
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
          <Text style={styles.textSpacing} type="label-02" text="Left side setup" />
          <RadioButton checked={leftSide === 'none'} id="none" label="Nothing" onPress={() => this.setState({ leftSide: 'none' })} />
          <RadioButton checked={leftSide === 'link'} id="link" label="Link" onPress={() => this.setState({ leftSide: 'link' })} />
          <RadioButton checked={leftSide === 'one_button'} id="one_button" label="One button" onPress={() => this.setState({ leftSide: 'one_button' })} />
          <RadioButton checked={leftSide === 'two_buttons'} id="two_buttons" label="Two buttons" onPress={() => this.setState({ leftSide: 'two_buttons' })} />
          <Text style={styles.textSpacing} type="label-02" text="Right side setup" />
          <RadioButton checked={rightSide === 'none'} id="none" label="Nothing" onPress={() => this.setState({ rightSide: 'none' })} />
          <RadioButton checked={rightSide === 'link'} id="link" label="Link" onPress={() => this.setState({ rightSide: 'link' })} />
          <RadioButton checked={rightSide === 'one_button'} id="one_button" label="One button" onPress={() => this.setState({ rightSide: 'one_button' })} />
          <RadioButton checked={rightSide === 'two_buttons'} id="two_buttons" label="Two buttons" onPress={() => this.setState({ rightSide: 'two_buttons' })} />
          <Checkbox checked={showSubTitle} id="showSubTitle" label="Show sub title" onPress={(value) => this.setState({ showSubTitle: value })} />
          <Checkbox checked={headingMode} id="headingMode" label="Use heading mode" onPress={(value) => this.setState({ headingMode: value })} />
          <Checkbox checked={showSearchBox} id="showSearchBox" label="Show search box" onPress={(value) => this.setState({ showSearchBox: value })} />
          <Checkbox checked={showSwitch} id="showSwitch" label="Show switch" onPress={(value) => this.setState({ showSwitch: value })} />
          <Checkbox checked={disableItems} id="disableItems" label="Disable links and icons" onPress={(value) => this.setState({ disableItems: value })} />
          <Checkbox checked={activeIcon} id="activeIcon" label="Make first icon active" onPress={(value) => this.setState({ activeIcon: value })} />
        </ScrollView>
      </View>
    );
  }
}
