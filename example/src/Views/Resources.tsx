import React from 'react';
import { StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, NavigationListItem } from 'carbon-react-native';
import LaunchIcon from '@carbon/icons/es/launch/20';
import LinkIcon from '@carbon/icons/es/link/20';
import GithubIcon from '@carbon/icons/es/logo--github/20';
import SlackIcon from '@carbon/icons/es/logo--slack/20';
import DocumentSketchIcon from '@carbon/icons/es/document--sketch/20';
import CarbonIcon from '@carbon/icons/es/carbon/20';

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
        <NavigationListItem text="#carbon-native-mobile" subText="Slack channel (IBM internal)" leftIcon={SlackIcon} rightIcon={LaunchIcon} onPress={() => this.openLink('https://ibm-ai-apps.slack.com/archives/C014RC2S0JZ')} />
        <NavigationListItem text="#carbon-react-native" subText="Slack channel (IBM internal)" leftIcon={SlackIcon} rightIcon={LaunchIcon} onPress={() => this.openLink('https://ibm-ai-apps.slack.com/archives/C0182GZ4EN6')} />
        <NavigationListItem text="Sketch libraries" subText="Design resources (Carbon v10)" leftIcon={DocumentSketchIcon} rightIcon={LaunchIcon} onPress={() => this.openLink('https://carbondesignsystem.com')} />
        <NavigationListItem text="Carbon React Native" subText="Github respository" leftIcon={GithubIcon} rightIcon={LaunchIcon} onPress={() => this.openLink('https://github.ibm.com/Aspera/carbon-react-native')} />
        <Text style={styles.baseSpacing} type="heading-compact-01" text="External frameworks" />
        <NavigationListItem text="React Native" subText="Framework for building native apps with React" leftIcon={LinkIcon} rightIcon={LaunchIcon} onPress={() => this.openLink('https://reactnative.dev')} />
        <NavigationListItem text="Carbon Design System" subText="Open source design system from IBM" leftIcon={CarbonIcon} rightIcon={LaunchIcon} onPress={() => this.openLink('https://carbondesignsystem.com')} />
      </ScrollView>
    );
  }
}
