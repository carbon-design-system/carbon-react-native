import React from 'react';
import { StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, NavigationListItemProps, NavigationList, DocumentViewer } from '@carbon/react-native';
import LaunchIcon from '@carbon/icons/es/launch/20';
import GithubIcon from '@carbon/icons/es/logo--github/20';
import SlackIcon from '@carbon/icons/es/logo--slack/20';
import ReactIcon from '@carbon/icons/es/logo--react/20';
import DiscordIcon from '@carbon/icons/es/logo--discord/20';
import FigmaIcon from '@carbon/icons/es/logo--figma/20';
import CarbonIcon from '@carbon/icons/es/carbon/20';
import { termsConditions } from '../constants/termsConditions';
import { privacyPolicy } from '../constants/privacyPolicy';
import { thirdPartyNotices } from '../constants/thirdPartyNotices';

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
  state = {
    showTerms: false,
    showPrivacy: false,
    showThirdParty: false,
  };

  private openLink = (link: string): void => {
    Linking.openURL(link);
  };

  private get mainResources(): NavigationListItemProps[] {
    return [
      {
        text: '#carbon-react-native',
        subText: 'Discord channel (Public)',
        leftIcon: DiscordIcon,
        rightIcon: LaunchIcon,
        onPress: () => this.openLink('https://discord.gg/KuWQnQ6FqB'),
      },
      {
        text: '#carbon-native-mobile',
        subText: 'Slack channel (IBM internal)',
        leftIcon: SlackIcon,
        rightIcon: LaunchIcon,
        onPress: () => this.openLink('https://ibm-ai-apps.slack.com/archives/C014RC2S0JZ'),
      },
      {
        text: '#carbon-react-native',
        subText: 'Slack channel (IBM internal)',
        leftIcon: SlackIcon,
        rightIcon: LaunchIcon,
        onPress: () => this.openLink('https://ibm-ai-apps.slack.com/archives/C0182GZ4EN6'),
      },
      {
        text: 'Figma library',
        subText: 'Design resources (Beta)',
        leftIcon: FigmaIcon,
        rightIcon: LaunchIcon,
        onPress: () => this.openLink('https://www.figma.com/file/O3KSDu2TWpMaazGkgsKqLA/(Beta)-Carbon-Native---Carbon-Design-System?type=design'),
      },
      {
        text: 'Carbon for React Native',
        subText: 'Github respository',
        leftIcon: GithubIcon,
        rightIcon: LaunchIcon,
        onPress: () => this.openLink('https://github.com/carbon-design-system/carbon-react-native'),
      },
    ];
  }

  private get externalLinks(): NavigationListItemProps[] {
    return [
      {
        text: 'React Native',
        subText: 'Framework for building native apps with React',
        leftIcon: ReactIcon,
        rightIcon: LaunchIcon,
        onPress: () => this.openLink('https://reactnative.dev'),
      },
      {
        text: 'Carbon Design System',
        subText: 'Open source design system from IBM',
        leftIcon: CarbonIcon,
        rightIcon: LaunchIcon,
        onPress: () => this.openLink('https://carbondesignsystem.com'),
      },
    ];
  }

  private get legalLinks(): NavigationListItemProps[] {
    return [
      {
        text: 'Terms and Conditions',
        onPress: () => this.setState({ showTerms: true }),
      },
      {
        text: 'Privacy Policy',
        onPress: () => this.setState({ showPrivacy: true }),
      },
      {
        text: 'Third Party Notices',
        onPress: () => this.setState({ showThirdParty: true }),
      },
    ];
  }

  render(): React.ReactNode {
    const { showTerms, showPrivacy, showThirdParty } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={styles.baseSpacing} type="heading-compact-01" text="Carbon for Mobile" />
        <NavigationList items={this.mainResources} />
        <Text style={styles.baseSpacing} type="heading-compact-01" text="External frameworks" />
        <NavigationList items={this.externalLinks} />
        <Text style={styles.baseSpacing} type="heading-compact-01" text="Legal" />
        <NavigationList items={this.legalLinks} />
        {showTerms && (
          <DocumentViewer
            source={termsConditions}
            title="Terms and Conditions"
            onDismiss={() => {
              this.setState({ showTerms: false });
            }}
          />
        )}
        {showPrivacy && (
          <DocumentViewer
            source={privacyPolicy}
            title="Privacy Policy"
            onDismiss={() => {
              this.setState({ showPrivacy: false });
            }}
          />
        )}
        {showThirdParty && (
          <DocumentViewer
            source={thirdPartyNotices}
            title="Third Party Notices"
            onDismiss={() => {
              this.setState({ showThirdParty: false });
            }}
          />
        )}
      </ScrollView>
    );
  }
}
