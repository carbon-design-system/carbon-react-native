import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { UiPanel, UiPanelItemProps, Checkbox, Button } from 'carbon-react-native';
import ApertureIcon from '@carbon/icons/es/aperture/20';
import LaunchIcon from '@carbon/icons/es/launch/20';

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

export default class TestUiPanel extends React.Component {
  state = {
    open: false,
    hasLeftIcon: false,
    hasRightIcon: false,
    hideFourthItem: false,
  };

  private openPanel = (): void => {
    this.setState({ open: true });
  };

  private alert = (text: string): void => {
    Alert.alert(text);
  };

  private get itemProps(): UiPanelItemProps[] {
    const { hasLeftIcon, hasRightIcon, hideFourthItem } = this.state;

    return [
      {
        text: 'Item 1: Toggle to expand',
        leftIcon: hasLeftIcon ? ApertureIcon : undefined,
        children: [
          {
            text: 'Children 1',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 1'),
          },
          {
            text: 'Children 2',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 2'),
          },
        ],
      },
      {
        text: 'Item 2: Disabled',
        leftIcon: hasLeftIcon ? ApertureIcon : undefined,
        textBreakMode: 'tail',
        disabled: true,
        children: [
          {
            text: 'Children 1',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 2 / Children 1'),
          },
        ],
      },
      {
        text: 'Item 3: Opened on load',
        leftIcon: hasLeftIcon ? ApertureIcon : undefined,
        openOnLoad: true,
        children: [
          {
            text: 'Children 1: Disabled',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 1'),
            disabled: true,
          },
          {
            text: 'Children 2',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 1 / Children 2'),
            onLongPress: () => this.alert('Long pressed Item 1 / Children 2'),
          },
        ],
      },
      {
        text: 'Item 4: Uncheck to hide',
        leftIcon: hasLeftIcon ? ApertureIcon : undefined,
        hidden: hideFourthItem,
        children: [
          {
            text: 'Children 1',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 4 / Children 1'),
          },
          {
            text: 'Children 2: Disabled',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            disabled: true,
            onPress: () => this.alert('Pressed Item 4 / Children 2'),
          },
          {
            text: 'Children 3',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            hidden: true,
            onPress: () => this.alert('Pressed Item 4 / Children 3'),
          },
          {
            text: 'Children 4: Children 3 is hidden',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 4 / Children 4'),
          },
        ],
      },
      {
        text: 'Item 5: Long text with ellipsis instead of wrapped',
        leftIcon: hasLeftIcon ? ApertureIcon : undefined,
        textBreakMode: 'tail',
        children: [
          {
            text: 'Children 1',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 1'),
          },
          {
            text: 'Children 2: Long text with ellipsis instead of wrapped',
            textBreakMode: 'tail',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 2'),
          },
          {
            text: 'Children 3: Long text with normal wrapped',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 3'),
          },
          {
            text: 'Children 4',
            rightIcon: hasRightIcon ? LaunchIcon : undefined,
            onPress: () => this.alert('Pressed Item 5 / Children 4'),
          },
        ],
      },
      {
        text: 'Item 6: No nested items',
        leftIcon: hasLeftIcon ? ApertureIcon : undefined,
      },
    ];
  }

  render(): React.ReactNode {
    const { open, hasLeftIcon, hasRightIcon, hideFourthItem } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={hasLeftIcon} id="hasLeftIcon" onPress={(value) => this.setState({ hasLeftIcon: value })} label="Add left icon at top level" />
        <Checkbox checked={hasRightIcon} id="hasRightIcon" onPress={(value) => this.setState({ hasRightIcon: value })} label="Add right icon in the nested level" />
        <Checkbox checked={hideFourthItem} id="hideFourthItem" onPress={(value) => this.setState({ hideFourthItem: value })} label="Check to hide the 4th item" />
        <Button onPress={this.openPanel} text="Open Panel" />
        <UiPanel open={open} onClose={() => this.setState({ open: false })} items={this.itemProps} />
      </ScrollView>
    );
  }
}
