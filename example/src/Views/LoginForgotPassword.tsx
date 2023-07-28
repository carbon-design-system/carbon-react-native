import React from 'react';
import { StyleSheet, ScrollView, View, Text as ReactText, Alert } from 'react-native';
import { ViewWrapper, Text, TopNavigationBarLogin, TextInput, Button, getColor, openLink, Loading, centerLoadingStyle, InlineLink, Link } from '@carbon/react-native';
import ArrowRightIcon from '@carbon/icons/es/arrow--right/20';

export default class TestLoginForgotPassword extends React.Component<{
  changeView: (view: string) => void;
}> {
  state = {
    loading: false,
    field: '',
    enterCode: false,
  };

  private get styles() {
    return StyleSheet.create({
      view: {
        flex: 1,
        padding: 16,
        paddingTop: 0,
      },
      container: {
        flexGrow: 1,
        paddingBottom: 64,
      },
      loginButton: {
        marginTop: 32,
        marginBottom: 32,
      },
      divider: {
        backgroundColor: getColor('borderSubtle00'),
        height: 1,
        marginBottom: 15,
      },
      noCodeText: {
        marginTop: 32,
      },
    });
  }

  private continue = (): void => {
    const { enterCode } = this.state;
    const { changeView } = this.props;

    if (enterCode) {
      changeView('Login - Create password');
    } else {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ field: '', enterCode: true, loading: false });
      }, 1500);
    }
  };

  private back = (): void => {
    const { enterCode } = this.state;
    const { changeView } = this.props;

    if (enterCode) {
      this.setState({ field: '', enterCode: false });
    } else {
      changeView('Login');
    }
  };

  private get needHelp(): React.ReactNode {
    return (
      <ReactText>
        <Text text="Need help? " />
        <InlineLink text="Contact support" onPress={() => openLink('https://www.ibm.com/mysupport')} />
      </ReactText>
    );
  }

  private get disabled(): boolean {
    const { field } = this.state;

    return !field;
  }

  private get noReceiveArea(): React.ReactNode {
    return (
      <View>
        <ReactText style={this.styles.noCodeText}>
          <Text text="Didn't receive the email? Check your spam filter for an email from " />
          <Text type="heading-compact-02" text="example@ibm.com" />
          <Text text="." />
        </ReactText>
        <Link text="Resend code" onPress={() => Alert.alert('Code resent')} />
      </View>
    );
  }

  private get mainView(): React.ReactNode {
    const { field, loading, enterCode } = this.state;

    if (loading) {
      return <Loading style={centerLoadingStyle} />;
    } else {
      return (
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={this.styles.container} style={this.styles.view}>
          <TextInput label={enterCode ? 'Code' : 'ID'} autoCapitalize="none" autoCorrect={false} value={field} required={true} onChangeText={(value) => this.setState({ field: value })} getErrorText={(value) => (value ? '' : `${enterCode ? 'Code' : 'ID'} is required`)} />
          {enterCode && this.noReceiveArea}
          <Button style={this.styles.loginButton} onPress={this.continue} text="Continue" icon={ArrowRightIcon} disabled={this.disabled} />
          <View style={this.styles.divider} />
          {this.needHelp}
        </ScrollView>
      );
    }
  }

  render(): React.ReactNode {
    const { enterCode } = this.state;

    return (
      <ViewWrapper topBackgroundColor="#000000" statusBarStyle="light-content">
        <TopNavigationBarLogin title={enterCode ? 'Check your email' : 'Having trouble logging in?'} backText={enterCode ? 'Back' : 'Login'} backOnPress={this.back} subTitle={enterCode ? 'If there is an account associated with the username provided, you will receive an email with a temporary code.' : 'Enter your ID to reset your password.'} />
        {this.mainView}
      </ViewWrapper>
    );
  }
}
