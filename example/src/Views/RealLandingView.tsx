import React from 'react';
import { AcceptTerms, DocumentViewer, LandingView } from 'carbon-react-native';
import { privacyPolicy } from '../constants/privacyPolicy';
import { versionCode } from '../constants/versionCode';
import { version } from '../../package.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { termsConditions } from '../constants/termsConditions';

const storageKey = '@carbon-react-native-example/accepted-terms';

export default class RealLandingView extends React.Component<{
  continueAction: () => void;
}> {
  state = {
    showPrivacy: false,
    showAcceptTerms: false,
    loading: true,
  };

  private acceptedTerms = false;

  private textStrings = {
    agree: 'Agree',
    disagree: 'Disagree',
    modalTitle: 'Are you sure?',
    modalBody: 'The use of this app requires agreement to the terms and conditions.',
    modalSecondaryAction: 'Disagree',
    modalPrimaryAction: 'Continue',
  };

  private onPrivacyPolicy = (): void => {
    this.setState({ showPrivacy: true });
  };

  private termsResultCallback = (result: boolean): void => {
    const { continueAction } = this.props;

    if (result) {
      AsyncStorage.setItem(storageKey, 'TRUE')
        .then(() => {
          continueAction();
        })
        .catch((error) => {
          console.error('Unable to set storage item for terms accepting', error);
          continueAction();
        });
    } else {
      this.setState({ showAcceptTerms: false });
    }
  };

  componentDidMount(): void {
    AsyncStorage.getItem(storageKey)
      .then((data) => {
        this.acceptedTerms = !!data;
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.error('Unable to get storage item for terms accepting', error);
        this.setState({ loading: false });
      });
  }

  render(): React.ReactNode {
    const { showPrivacy, showAcceptTerms, loading } = this.state;
    const { continueAction } = this.props;

    return (
      <>
        <LandingView
          productImage={require('../assets/app_icon.png')}
          companyImage={require('../assets/companyImage.png')}
          longProductName="Carbon for Mobile"
          versionText={`Version ${version} (${versionCode})`}
          copyrightText="Copyright © 2022 IBM"
          continueText="Continue"
          continueDisabled={loading}
          continueOnPress={() => {
            if (this.acceptedTerms) {
              continueAction();
            } else {
              this.setState({ showAcceptTerms: true });
            }
          }}
          privacyPolicyText="Privacy Policy"
          privacyPolicyOnPress={this.onPrivacyPolicy}
        />
        {showPrivacy && (
          <DocumentViewer
            source={privacyPolicy}
            title="Privacy Policy"
            onDismiss={() => {
              this.setState({ showPrivacy: false });
            }}
          />
        )}
        {showAcceptTerms && <AcceptTerms title="Terms and Conditions" resultsCallback={this.termsResultCallback} textStrings={this.textStrings} source={termsConditions} />}
      </>
    );
  }
}
