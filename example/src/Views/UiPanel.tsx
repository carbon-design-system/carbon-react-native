import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { UiPanel, UiPanelItemProps, Checkbox, ViewWrapper, TopNavigationBar } from 'carbon-react-native';
import BeeIcon from '@carbon/icons/es/bee/20';
import LaunchIcon from '@carbon/icons/es/launch/20';
import MenuIcon from '@carbon/icons/es/menu/20';
import CloseIcon from '@carbon/icons/es/close/20';
import ExitIcon from '@carbon/icons/es/logout/20';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
});

export default class TestUiPanel extends React.Component<{
  goHome: () => void;
}> {
  state = {
    open: false,
    hasLeftIcon: false,
    hasRightIcon: false,
    hasChildLeftIcon: false,
    hasChildRightIcon: false,
    hideFourthItem: false,
    autoCloseNoChild: false,
  };

  private togglePanel = (): void => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  private alert = (text: string): void => {
    Alert.alert(text);
  };

  private get itemProps(): UiPanelItemProps[] {
    const { hasLeftIcon, hasRightIcon, hasChildLeftIcon, hasChildRightIcon, hideFourthItem } = this.state;

    return [
      {
        text: 'Item 1: Toggle to expand',
        leftIcon: hasLeftIcon ? BeeIcon : undefined,
        rightIcon: hasRightIcon ? BeeIcon : undefined,
        children: [
          {
            text: 'Children 1',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 1'),
          },
          {
            text: 'Children 2',
            leftIcon: hasChildRightIcon ? BeeIcon : undefined,
            rightIcon: hasChildLeftIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 2'),
          },
        ],
      },
      {
        text: 'Item 2: Disabled',
        leftIcon: hasLeftIcon ? BeeIcon : undefined,
        rightIcon: hasRightIcon ? BeeIcon : undefined,
        textBreakMode: 'tail',
        disabled: true,
        children: [
          {
            text: 'Children 1',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 2 / Children 1'),
          },
        ],
      },
      {
        text: 'Item 3: Opened on load',
        leftIcon: hasLeftIcon ? BeeIcon : undefined,
        rightIcon: hasRightIcon ? BeeIcon : undefined,
        openOnLoad: true,
        children: [
          {
            text: 'Children 1: Disabled',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 1'),
            disabled: true,
          },
          {
            text: 'Children 2',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 2'),
            onLongPress: () => this.alert('Long pressed Item 1 / Children 2'),
          },
        ],
      },
      {
        text: 'Item 4: Uncheck to hide',
        leftIcon: hasLeftIcon ? BeeIcon : undefined,
        rightIcon: hasRightIcon ? BeeIcon : undefined,
        hidden: hideFourthItem,
        children: [
          {
            text: 'Children 1',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 4 / Children 1'),
          },
          {
            text: 'Children 2: Disabled',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            disabled: true,
            onPress: () => this.alert('Pressed Item 4 / Children 2'),
          },
          {
            text: 'Children 3',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            hidden: true,
            onPress: () => this.alert('Pressed Item 4 / Children 3'),
          },
          {
            text: 'Children 4: Children 3 is hidden',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 4 / Children 4'),
          },
        ],
      },
      {
        text: 'Item 5: Long text with ellipsis instead of wrapped',
        leftIcon: hasLeftIcon ? BeeIcon : undefined,
        rightIcon: hasRightIcon ? BeeIcon : undefined,
        textBreakMode: 'tail',
        children: [
          {
            text: 'Children 1',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 1'),
          },
          {
            text: 'Children 2: Long text with ellipsis instead of wrapped',
            textBreakMode: 'tail',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 2'),
          },
          {
            text: 'Children 3: Long text with normal wrapped',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 3'),
          },
          {
            text: 'Children 4',
            leftIcon: hasChildLeftIcon ? BeeIcon : undefined,
            rightIcon: hasChildRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 4'),
          },
        ],
      },
      {
        text: 'Item 6: No nested items',
        leftIcon: hasLeftIcon ? BeeIcon : undefined,
        rightIcon: hasRightIcon ? LaunchIcon : undefined,
        onPress: () => this.alert('Pressed Item 6'),
      },
    ];
  }

  render(): React.ReactNode {
    const { open, hasLeftIcon, hasRightIcon, hideFourthItem, hasChildLeftIcon, hasChildRightIcon, autoCloseNoChild } = this.state;
    const { goHome } = this.props;

    return (
      <ViewWrapper hasTopNavigation={true}>
        <TopNavigationBar title="UI panel" leftItems={[{ text: 'Toggle menu', icon: open ? CloseIcon : MenuIcon, onPress: this.togglePanel, active: open }]} rightItems={[{ text: 'Return to components', icon: ExitIcon, onPress: goHome }]} />
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
          <Checkbox checked={hasLeftIcon} id="hasLeftIcon" onPress={(value) => this.setState({ hasLeftIcon: value })} label="Add left icon at top level" />
          <Checkbox checked={hasRightIcon} id="hasRightIcon" onPress={(value) => this.setState({ hasRightIcon: value })} label="Add right icon at top level" />
          <Checkbox checked={hasChildRightIcon} id="hasChildRightIcon" onPress={(value) => this.setState({ hasChildRightIcon: value })} label="Add right icon in the nested level" />
          <Checkbox checked={hasChildLeftIcon} id="hasChildLeftIcon" onPress={(value) => this.setState({ hasChildLeftIcon: value })} label="Add left icon in the nested level" />
          <Checkbox checked={hideFourthItem} id="hideFourthItem" onPress={(value) => this.setState({ hideFourthItem: value })} label="Check to hide the 4th item" />
          <Checkbox checked={autoCloseNoChild} id="autoCloseNoChild" onPress={(value) => this.setState({ autoCloseNoChild: value })} label="Close when pressing item with no children" />
        </ScrollView>
        <UiPanel open={open} onClose={() => this.setState({ open: false })} items={this.itemProps} closeOnNoChildrenPress={autoCloseNoChild} />
      </ViewWrapper>
    );
  }
}
