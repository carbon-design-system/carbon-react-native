import React from 'react';
import { StyleSheet, ScrollView, View, Alert, Text as ReactText } from 'react-native';
import { ViewWrapper, Text, TopNavigationBarLogin, InlineLink, TextInput, PasswordInput, Checkbox, Button, getColor, openLink, TooltipProps, LinkProps, Notification, DocumentViewer } from '@carbon/react-native';
import ArrowRightIcon from '@carbon/icons/es/arrow--right/20';
import InformationIcon from '@carbon/icons/es/information/20';
import { TestSignUpForm } from './LoginCreateAccount';

export default class TestLogin extends React.Component<{
  goHome: () => void;
  changeView: (view: string) => void;
  afterReset?: boolean;
}> {
  state = {
    openCreate: false,
    error: false,
    id: '',
    password: '',
    rememberId: false,
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
      topText: {
        color: getColor('textOnColor'),
      },
      rememberId: {
        marginTop: 16,
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
      tooltipText: {
        color: getColor('textInverse'),
      },
      error: {
        marginTop: 16,
      },
    });
  }

  private logIn = (): void => {
    const { goHome } = this.props;

    Alert.alert('Login flow finished', 'You have logged in. After checking account you would let user into main app. Would you like to go home or trigger login failure?', [
      {
        text: 'Trigger error',
        onPress: () => {
          this.setState({ error: true, finalLogin: false });
        },
      },
      {
        text: 'Go home',
        onPress: goHome,
      },
    ]);
  };

  private forgotPassword = (): void => {
    const { changeView } = this.props;

    changeView('Login - Forgot password');
  };

  private get helperText(): React.ReactNode | string {
    const { afterReset } = this.props;

    if (afterReset) {
      return 'Log in to continue';
    }

    return (
      <ReactText>
        <Text style={this.styles.topText} text="Don't have an account? " />
        <InlineLink forceDarkMode={true} text="Create an account" onPress={() => this.setState({ openCreate: true })} />
      </ReactText>
    );
  }

  private get needHelp(): React.ReactNode {
    return (
      <ReactText>
        <Text text="Need help? " />
        <InlineLink text="Contact support" onPress={() => openLink('https://www.ibm.com/mysupport')} />
      </ReactText>
    );
  }

  private get passwordLabelLink(): LinkProps {
    return {
      text: 'Forgot password?',
      onPress: this.forgotPassword,
    };
  }

  private get rememberTooltip(): TooltipProps {
    return {
      content: <Text style={this.styles.tooltipText} text="You can opt to have your ID remembered the next time you access this product by checking the 'Remember me' box." />,
      contentStyle: {
        maxWidth: 200,
      },
      buttonProps: {
        kind: 'ghost',
        overrideColor: getColor('iconSecondary'),
        iconOnlyMode: true,
        icon: InformationIcon,
        text: 'Remember ID info',
      },
    };
  }

  private get disabled(): boolean {
    const { id, password } = this.state;

    return !(id && password);
  }

  render(): React.ReactNode {
    const { openCreate, id, password, rememberId, error } = this.state;
    const { goHome, afterReset } = this.props;

    return (
      <ViewWrapper topBackgroundColor="#000000" statusBarStyle="light-content">
        <TopNavigationBarLogin title={afterReset ? 'Your new password has been activated' : 'Log in to IBM Carbon React Native Test App'} backText="Back" backOnPress={afterReset ? undefined : goHome} subTitle={this.helperText} />
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={this.styles.container} style={this.styles.view}>
          {error && <Notification style={this.styles.error} title="Error" kind="error" subTitle="Invalid ID or password" lowContrast={true} onDismiss={() => this.setState({ error: false })} />}
          <TextInput label="ID" autoCapitalize="none" autoCorrect={false} value={id} required={true} onChangeText={(value) => this.setState({ id: value, error: false })} getErrorText={(value) => (value ? '' : 'ID is required')} />
          <PasswordInput label="Password" autoCapitalize="none" autoCorrect={false} value={password} required={true} onChangeText={(value) => this.setState({ password: value, error: false })} getErrorText={(value) => (value ? '' : 'Password is required')} labelLink={this.passwordLabelLink} />
          <Checkbox style={this.styles.rememberId} id="remember-id" label="Remember ID" checked={rememberId} onPress={(value) => this.setState({ rememberId: value })} tooltipProps={this.rememberTooltip} />
          <Button style={this.styles.loginButton} onPress={this.logIn} text="Log in" icon={ArrowRightIcon} disabled={this.disabled} />
          <View style={this.styles.divider} />
          {this.needHelp}
        </ScrollView>
        {!!openCreate && <DocumentViewer title="Sign up" sourceNode={<TestSignUpForm close={() => this.setState({ openCreate: false })} />} onDismiss={() => this.setState({ openCreate: false })} dismissText="Cancel" disableContainerPadding={true} />}
      </ViewWrapper>
    );
  }
}
