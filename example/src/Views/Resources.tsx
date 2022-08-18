import React from 'react';
import { StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, NavigationListItem } from 'carbon-react-native';
import LaunchIcon from '@carbon/icons/es/launch/20';

const styles = StyleSheet.create({
  view: {
    flex: 1,
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

// TODO: not sure what link for all of these. And some will change as we move projects.
export default class TestResources extends React.Component {
  private openLink = (link: string): void => {
    Linking.openURL(link);
  };

  render(): React.ReactNode {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={styles.baseSpacing} type="heading-compact-01" text="Carbon Native Mobile" />
        <NavigationListItem text="Carbon Native Mobile" subText="Documentation" rightIcon={LaunchIcon} onPress={() => this.openLink('https://carbondesignsystem.com')} />
        <NavigationListItem text="Carbon Native Mobile library" subText="Github respository" rightIcon={LaunchIcon} onPress={() => this.openLink('https://github.ibm.com/Aspera/carbon-react-native')} />
        <NavigationListItem text="Sketch libraries" subText="Framework for designers" rightIcon={LaunchIcon} onPress={() => this.openLink('https://carbondesignsystem.com/designing/design-resources/#native-mobile')} />
        <Text style={styles.baseSpacing} type="heading-compact-01" text="External frameworks" />
        <NavigationListItem text="React Native" subText="A framework for building native apps with React" rightIcon={LaunchIcon} onPress={() => this.openLink('https://reactnative.dev')} />
        <NavigationListItem text="Carbon Design System" subText="Open source design system from IBM" rightIcon={LaunchIcon} onPress={() => this.openLink('https://carbondesignsystem.com')} />
      </ScrollView>
    );
  }
}
