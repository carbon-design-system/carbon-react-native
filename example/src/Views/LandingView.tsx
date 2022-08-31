import React from 'react';
import { DocumentViewer, LandingView } from 'carbon-react-native';
import { testDocument } from '../constants/testDocument';

export default class TestLandinView extends React.Component<{
  goHome: () => void;
}> {
  state = {
    showPrivacy: false,
  };

  private onContinue = (): void => {
    const { goHome } = this.props;
    goHome();
  };

  private onPrivacyPolicy = (): void => {
    this.setState({ showPrivacy: true });
  };

  render(): React.ReactNode {
    const { showPrivacy } = this.state;

    return (
      <>
        <LandingView productImage={require('../assets/productImage.png')} companyImage={require('../assets/companyImage.png')} longProductName="IBM Carbon React Native Test App" versionText="Version 12.23.98 (152669)" copyrightText="Copyright © 2022 IBM" continueText="Continue" continueOnPress={this.onContinue} privacyPolicyText="Privacy Policy" privacyPolicyOnPress={this.onPrivacyPolicy} />
        {showPrivacy && (
          <DocumentViewer
            source={testDocument}
            title="Privacy Policy"
            onDismiss={() => {
              this.setState({ showPrivacy: false });
            }}
          />
        )}
      </>
    );
  }
}
