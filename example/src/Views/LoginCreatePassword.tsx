import React from 'react';
import { StyleSheet, ScrollView, View, Text as ReactText } from 'react-native';
import { ViewWrapper, Text, TopNavigationBarLogin, InlineLink, PasswordInput, Button, getColor, openLink, List } from '@carbon/react-native';
import ArrowRightIcon from '@carbon/icons/es/arrow--right/20';

export default class TestLoginCreatePassword extends React.Component<{
  changeView: (view: string) => void;
}> {
  state = {
    password: '',
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
      rulePassed: {
        color: getColor('textDisabled'),
      },
      passwordRules: {
        marginTop: 32,
      },
    });
  }

  private setPassword = (): void => {
    const { changeView } = this.props;

    changeView('Login - After set');
  };

  private get needHelp(): React.ReactNode {
    return (
      <ReactText>
        <Text text="Need help? " />
        <InlineLink text="Contact support" onPress={() => openLink('https://www.ibm.com/mysupport')} />
      </ReactText>
    );
  }

  private get passwordRules(): React.ReactNode {
    const { password } = this.state;
    const items = [<Text text="Eight characters minimum" style={password?.length >= 8 ? this.styles.rulePassed : undefined} />, <Text text="One uppercase letter" style={password.match(/[A-Z]/)?.length ? this.styles.rulePassed : undefined} />, <Text text="One lowercase letter" style={password.match(/[a-z]/)?.length ? this.styles.rulePassed : undefined} />, <Text text="One number" style={password.match(/[0-9]/)?.length ? this.styles.rulePassed : undefined} />];

    return <List style={this.styles.passwordRules} type="unordered" items={items} />;
  }

  private get invalidPassword(): boolean {
    const { password } = this.state;

    return !(password && password?.length >= 8 && password.match(/[A-Z]/)?.length && password.match(/[a-z]/)?.length && password.match(/[0-9]/)?.length);
  }

  private getErrorText = (value: string): string => {
    return value ? (this.invalidPassword ? 'Password must meet the following crieria:' : '') : 'Password is required';
  };

  render() {
    const { password } = this.state;

    return (
      <ViewWrapper topBackgroundColor="#000000" statusBarStyle="light-content">
        <TopNavigationBarLogin title="Create your new password" />
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={this.styles.container} style={this.styles.view}>
          <PasswordInput label="Password" autoCapitalize="none" autoCorrect={false} value={password} required={true} onChangeText={(value) => this.setState({ password: value })} getErrorText={this.getErrorText} isInvalid={() => this.invalidPassword} />
          {this.passwordRules}
          <Button style={this.styles.loginButton} onPress={this.setPassword} text="Log in" icon={ArrowRightIcon} disabled={this.invalidPassword} />
          <View style={this.styles.divider} />
          {this.needHelp}
        </ScrollView>
      </ViewWrapper>
    );
  }
}
