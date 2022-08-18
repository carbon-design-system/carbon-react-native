import { Checkbox, NavigationListItem, NavigationListItemProps, Text } from 'carbon-react-native';
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
});

export default class TestNavigationLisstItem extends React.Component {
  state = {
    showSubText: false,
    hasLeftIcon: true,
    hasRightIcon: false,
    hasChevron: true,
  };

  private getProps(text: string): NavigationListItemProps {
    const { showSubText, hasLeftIcon, hasRightIcon, hasChevron } = this.state;

    return {
      text: text,
      onPress: () => Alert.alert(`Pressed ${(text || '').toLowerCase()}`),
      subText: showSubText ? 'Useful text to describe the action' : undefined,
      leftIcon: hasLeftIcon ? ApertureIcon : undefined,
      rightIcon: hasRightIcon ? LaunchIcon : undefined,
      hasChevron: hasChevron,
    };
  }

  render(): React.ReactNode {
    const { showSubText, hasLeftIcon, hasRightIcon, hasChevron } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.mainContent}>
          <Checkbox checked={showSubText} id="showSubText" onPress={(value) => this.setState({ showSubText: value })} label="Show sub text" />
          <Checkbox checked={hasLeftIcon} id="hasLeftIcon" onPress={(value) => this.setState({ hasLeftIcon: value })} label="Has left icon" />
          <Checkbox checked={hasRightIcon} id="hasRightIcon" onPress={(value) => this.setState({ hasRightIcon: value })} label="Has right icon" />
          <Checkbox checked={hasChevron} id="hasChevron" onPress={(value) => this.setState({ hasChevron: value })} label="Has nav chevron" />
        </View>
        <Text style={styles.baseSpacing} type="heading-compact-01" text="Spacing heading" />
        <NavigationListItem {...this.getProps('Branding information')} />
        <NavigationListItem {...this.getProps('Fun link to stuff')} />
        <NavigationListItem {...this.getProps('Additional content')} />
        <Text style={styles.baseSpacing} type="heading-compact-01" text="Spacing heading for additional content" />
        <NavigationListItem {...this.getProps('More fun stuff')} />
        <NavigationListItem {...this.getProps('Disabled row')} disabled={true} />
        <NavigationListItem {...this.getProps('Very long text without clipping that is crazy long and will wrap and be a bit drama')} />
        <NavigationListItem {...this.getProps('Very long text with clipping that is crazy long and will wrap')} textBreakMode="tail" />
      </ScrollView>
    );
  }
}
