import React from 'react';
import { StyleSheet, ScrollView, View, Text as ReactText, Alert } from 'react-native';
import { Button, Checkbox, DocumentViewer, Dropdown, getColor, InlineLink, List, openLink, PasswordInput, Text, TextInput } from 'carbon-react-native';
import { testDocument } from '../constants/testDocument';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  itemStyle: {
    marginTop: 16,
  },
  dropdowns: {
    paddingTop: 22,
  },
  passwordRules: {
    marginTop: 8,
    marginBottom: 42,
  },
  rulePassed: {
    color: getColor('textDisabled'),
  },
  lightText: {
    color: getColor('textHelper'),
  },
  moreInfo: {
    marginTop: 48,
    marginBottom: 20,
  },
  button: {
    marginTop: 32,
  },
});

export class TestSignUpForm extends React.Component<{
  close: () => void;
}> {
  state = {
    openTerms: false,
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    address: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    phone: '',
    password: '',
    informEmail: false,
    informPhone: false,
    informMail: false,
    terms: false,
  };

  private submitForm = (): void => {
    const { close } = this.props;

    Alert.alert('Account created', 'Here you would create the account and you can choose to auto login or require them to login with new account, based on server capabilities.', [
      {
        text: 'OK',
        onPress: () => {
          close();
        },
      },
    ]);
  };

  private get passwordRules(): React.ReactNode {
    const { password } = this.state;
    const items = [<Text text="Eight characters minimum" style={password?.length >= 8 ? styles.rulePassed : undefined} />, <Text text="One uppercase letter" style={password.match(/[A-Z]/)?.length ? styles.rulePassed : undefined} />, <Text text="One lowercase letter" style={password.match(/[a-z]/)?.length ? styles.rulePassed : undefined} />, <Text text="One number" style={password.match(/[0-9]/)?.length ? styles.rulePassed : undefined} />];

    return <List style={styles.passwordRules} type="unordered" items={items} />;
  }

  private get invalidPassword(): boolean {
    const { password } = this.state;

    return !(password && password?.length >= 8 && password.match(/[A-Z]/)?.length && password.match(/[a-z]/)?.length && password.match(/[0-9]/)?.length);
  }

  private getErrorText = (value: string): string => {
    return value ? (this.invalidPassword ? 'Password must meet the following crieria:' : '') : 'Password is required';
  };

  private get disabled(): boolean {
    const { email, firstName, lastName, country, state, phone, password, terms } = this.state;

    return !(!this.invalidPassword && email && firstName && lastName && country && state && phone && password && terms);
  }

  render(): React.ReactNode {
    const { email, firstName, lastName, company, jobTitle, address, address2, city, country, state, phone, password, informEmail, informMail, informPhone, terms, openTerms } = this.state;

    const countries = [
      { id: 'usa', text: 'USA' },
      { id: 'canada', text: 'Canada' },
      { id: 'mexico', text: 'Mexico' },
    ];

    const states = [
      { id: 'california', text: 'California' },
      { id: 'new_york', text: 'New York' },
      { id: 'texas', text: 'Texas' },
      { id: 'quebec', text: 'Quebec' },
    ];

    return (
      <View style={styles.view}>
        <TextInput label="Email" required={true} value={email} onChangeText={(value) => this.setState({ email: value })} getErrorText={(value) => (value ? '' : 'Email is required')} />
        <TextInput label="First name" required={true} value={firstName} onChangeText={(value) => this.setState({ firstName: value })} getErrorText={(value) => (value ? '' : 'First name is required')} />
        <TextInput label="Last name" required={true} value={lastName} onChangeText={(value) => this.setState({ lastName: value })} getErrorText={(value) => (value ? '' : 'Last name is required')} />
        <TextInput label="Company (optional)" value={company} onChangeText={(value) => this.setState({ company: value })} />
        <TextInput label="Job title (optional)" value={jobTitle} onChangeText={(value) => this.setState({ jobTitle: value })} />
        <TextInput label="Stress address (optional)" value={address} onChangeText={(value) => this.setState({ address: value })} placeholder="123 Example St." />
        <TextInput label="Stress address line 2 (optional)" value={address2} onChangeText={(value) => this.setState({ address2: value })} placeholder="Apartment, unit, suite" />
        <TextInput label="City (optional)" value={city} onChangeText={(value) => this.setState({ city: value })} />
        <Dropdown style={styles.dropdowns} label="Country or region" value={country} valueToText={(value) => countries.filter((item) => item.id === value)[0]?.text || value} items={countries} onChange={(item) => this.setState({ country: item.id })} />
        <Dropdown style={styles.dropdowns} label="State or provence" value={state} valueToText={(value) => states.filter((item) => item.id === value)[0]?.text || value} items={states} onChange={(item) => this.setState({ state: item.id })} />
        <TextInput label="Phone" required={true} value={phone} onChangeText={(value) => this.setState({ phone: value })} getErrorText={(value) => (value ? '' : 'Phone is required')} />
        <PasswordInput label="Password" autoCapitalize="none" autoCorrect={false} value={password} required={true} onChangeText={(value) => this.setState({ password: value })} getErrorText={this.getErrorText} isInvalid={() => this.invalidPassword} />
        {this.passwordRules}
        <Text type="heading-compact-02" text="Stay informed" />
        <Text text="IBM may use my contact data to keep me informed of products, services and offerings:" />
        <Checkbox id="informEmail" label="By email" checked={informEmail} onPress={(value) => this.setState({ informEmail: value })} />
        <Checkbox id="informPhone" label="By phone" checked={informPhone} onPress={(value) => this.setState({ informPhone: value })} />
        <Checkbox id="informMail" label="By postal mail" checked={informMail} onPress={(value) => this.setState({ informMail: value })} />
        <ReactText>
          <Text type="body-01" style={styles.lightText} text="You can withdraw your marketing consent at any time by sending an email to " />
          <InlineLink text="netsupp@us.ibm.com" onPress={() => openLink('mailto:netsupp@us.ibm.com')} />
          <Text type="body-01" style={styles.lightText} text=". Also you may unsubscribe from receiving marketing emails by clicking the unsubscribe link in each such email." />
        </ReactText>
        <ReactText style={styles.moreInfo}>
          <Text text="More information on our processing can be found in the IBM Privacy Statement. By submitting this form, I acknowledge that I have read and understand the " />
          <InlineLink text="IBM Privacy Statement" onPress={() => openLink('https://www.ibm.com/privacy')} />
          <Text text="." />
        </ReactText>
        <ReactText>
          <Text text="I accept the product " />
          <InlineLink text="Terms and Conditions" onPress={() => this.setState({ openTerms: true })} />
          <Text text=" of this registration form:" />
        </ReactText>
        <Checkbox id="terms" label="I accept the Terms and Conditions" checked={terms} onPress={(value) => this.setState({ terms: value })} />
        <Button style={styles.button} disabled={this.disabled} text="Submit" onPress={this.submitForm} />
        {!!openTerms && <DocumentViewer title="Terms and Conditions" source={testDocument} onDismiss={() => this.setState({ openTerms: false })} dismissText="Close" />}
      </View>
    );
  }
}

export default class TestLoginCreateAccount extends React.Component {
  state = {
    openCreate: false,
  };

  render(): React.ReactNode {
    const { openCreate } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Button onPress={() => this.setState({ openCreate: true })} text="Open create form" style={styles.itemStyle} />
        {!!openCreate && <DocumentViewer title="Sign up" sourceNode={<TestSignUpForm close={() => this.setState({ openCreate: false })} />} onDismiss={() => this.setState({ openCreate: false })} dismissText="Cancel" disableContainerPadding={true} />}
      </ScrollView>
    );
  }
}
