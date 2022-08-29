import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { LandingView } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default class TestLandinView extends React.Component<{
  goHome: () => void;
}> {
  private onContinue = (): void => {
    const { goHome } = this.props;
    Alert.alert('Continue pressed', 'Do you want to go back home or stay here?', [
      {
        text: 'Stay here',
        onPress: () => {},
      },
      {
        text: 'Go home',
        onPress: goHome,
      },
    ]);
  };

  private onPrivacyPolicy = (): void => {
    Alert.alert('View privacy policy pressed');
  };

  render(): React.ReactNode {
    return (
      <View style={styles.view}>
        <LandingView productImage={require('../assets/productImage.png')} companyImage={require('../assets/companyImage.png')} longProductName="IBM Carbon React Native Test App" versionText="Version 12.23.98 (152669)" copyrightText="Copyright © 2022 IBM" continueText="Continue" continueOnPress={this.onContinue} privacyPolicyText="Privacy Policy" privacyPolicyOnPress={this.onPrivacyPolicy} />
      </View>
    );
  }
}
