import { Checkbox, NavigationList, NavigationListItemProps, RadioButton, Text } from '@carbon/react-native';
import React from 'react';
import { StyleSheet, ScrollView, Alert, View } from 'react-native';
import ApertureIcon from '@carbon/icons/es/aperture/20';
import LaunchIcon from '@carbon/icons/es/launch/20';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  mainContent: {
    padding: 16,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  baseSpacing: {
    margin: 16,
    marginTop: 32,
    marginBottom: 8,
  },
  radioWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButton: {
    marginRight: 16,
  },
});

export default class TestNavigationLisst extends React.Component {
  state = {
    showSubText: false,
    hasLeftIcon: true,
    hasRightIcon: false,
    hasChevron: true,
    actionType: 'none',
    currentSelected: '',
    reverseSubText: false,
    hasRightText: false,
    hasUnreadBadge: false,
  };

  private checkBoxMap: {[key: string] : boolean} = {};

  private getProps(text: string): NavigationListItemProps {
    const { showSubText, hasLeftIcon, hasRightIcon, hasChevron, actionType, currentSelected, reverseSubText, hasRightText, hasUnreadBadge } = this.state;
    let selectSide: 'right' | 'left' | undefined = undefined;
    let selectType: 'radio' | 'checkbox' | undefined = undefined;

    if (actionType !== 'none' && actionType.includes('-')) {
      const split = actionType.split('-');
      selectSide = split[0] as 'right' | 'left';
      selectType = split[1] as 'radio' | 'checkbox';
    }

    return {
      text: text,
      onPress: () => Alert.alert(`Pressed ${(text || '').toLowerCase()}`),
      subText: showSubText ? 'Useful text to describe the action' : undefined,
      leftIcon: hasLeftIcon ? ApertureIcon : undefined,
      rightIcon: hasRightIcon ? LaunchIcon : undefined,
      hasChevron: hasChevron,
      selectableSide: selectSide,
      selectableType: selectType,
      reverseSubText: reverseSubText,
      unreadBadge: hasUnreadBadge,
      rightText: hasRightText ? 'Detail' : undefined,
      selected: selectType === 'radio' ? text === currentSelected : !!this.checkBoxMap[text],
      onSelectableRowChange: (value) => {
        this.checkBoxMap[text] = value;
        this.setState({ currentSelected: text });
      },
    };
  }

  render(): React.ReactNode {
    const { showSubText, hasLeftIcon, hasRightIcon, hasChevron, actionType, reverseSubText, hasRightText, hasUnreadBadge } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.mainContent}>
          <Checkbox checked={showSubText} id="showSubText" onPress={(value) => this.setState({ showSubText: value })} label="Show sub text" />
          <Checkbox checked={hasLeftIcon} id="hasLeftIcon" onPress={(value) => this.setState({ hasLeftIcon: value })} label="Has left icon" />
          <Checkbox checked={hasRightIcon} id="hasRightIcon" onPress={(value) => this.setState({ hasRightIcon: value })} label="Has right icon" />
          <Checkbox checked={hasChevron} id="hasChevron" onPress={(value) => this.setState({ hasChevron: value })} label="Has nav chevron" />
          <Checkbox checked={reverseSubText} id="reverseSubText" onPress={(value) => this.setState({ reverseSubText: value })} label="Reverse sub text" />
          <Checkbox checked={hasRightText} id="hasRightText" onPress={(value) => this.setState({ hasRightText: value })} label="Has right text" />
          <Checkbox checked={hasUnreadBadge} id="hasUnreadBadge" onPress={(value) => this.setState({ hasUnreadBadge: value })} label="Has unread badge" />
          <Text text="Action type" type="label-02" />
          <View style={styles.radioWrapper}>
            <RadioButton style={styles.radioButton} checked={actionType === 'none'} id="none" label="None" onPress={() => this.setState({ actionType: 'none' })} />
            <RadioButton style={styles.radioButton} checked={actionType === 'left-radio'} id="left-radio" label="Left radio" onPress={() => this.setState({ actionType: 'left-radio' })} />
            <RadioButton style={styles.radioButton} checked={actionType === 'right-radio'} id="right-radio" label="Right radio" onPress={() => this.setState({ actionType: 'right-radio' })} />
            <RadioButton style={styles.radioButton} checked={actionType === 'left-checkbox'} id="left-checkbox" label="Left checkbox" onPress={() => this.setState({ actionType: 'left-checkbox' })} />
            <RadioButton style={styles.radioButton} checked={actionType === 'right-checkbox'} id="right-checkbox" label="Right checkbox" onPress={() => this.setState({ actionType: 'right-checkbox' })} />
          </View>
        </View>
        <Text style={styles.baseSpacing} type="heading-compact-01" text="Spacing heading" />
        <NavigationList items={[this.getProps('Branding information'), this.getProps('Fun link to stuff'), this.getProps('Additional content')]} />
        <Text style={styles.baseSpacing} type="heading-compact-01" text="Spacing heading for additional content" />
        <NavigationList items={[this.getProps('More fun stuff'), { ...this.getProps('Disabled row'), disabled: true }, this.getProps('Very long text without clipping that is crazy long and will wrap and be a bit drama'), { ...this.getProps('Very long text with clipping that is crazy long and will wrap'), textBreakMode: 'tail' }]} />
      </ScrollView>
    );
  }
}
