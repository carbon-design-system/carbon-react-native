import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { AcceptTerms, Button, Checkbox } from 'carbon-react-native';
import { testDocument } from '../constants/testDocument';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  itemStyle: {
    marginTop: 16,
  },
});

export default class TestAcceptTerms extends React.Component {
  state = {
    open: false,
    forceIos: false,
    forceAndroid: false,
    loadSite: false,
  };

  private textStrings = {
    agree: 'Agree',
    disagree: 'Disagree',
    modalTitle: 'Are you sure?',
    modalBody: 'The use of this app requires agreement to the terms and conditions.',
    modalSecondaryAction: 'Disagree',
    modalPrimaryAction: 'Continue',
  };

  private open = (): void => {
    this.setState({ open: true });
  };

  private resultCallback = (result: boolean): void => {
    this.setState({ open: false });
    Alert.alert(result ? 'You accepted the terms' : 'You did not accept the terms', result ? 'Your app show save they have accepted and never show again unless terms change.' : 'Your app should exit or return to landing.');
  };

  render(): React.ReactNode {
    const { open, forceIos, forceAndroid, loadSite } = this.state;
    let forceType = undefined as 'android' | 'ios' | undefined;

    if (forceAndroid) {
      forceType = 'android';
    } else if (forceIos) {
      forceType = 'ios';
    }

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={forceIos} id="forceIos" onPress={(value) => this.setState({ forceIos: value })} label="Force iOS mode" />
        <Checkbox checked={forceAndroid} id="forceAndroid" onPress={(value) => this.setState({ forceAndroid: value })} label="Force Android mode" />
        <Checkbox checked={loadSite} id="loadSite" onPress={(value) => this.setState({ loadSite: value })} label="Load website" />
        <Button onPress={this.open} text="Trigger accept flow" style={styles.itemStyle} />
        {open && <AcceptTerms title="Terms and Conditions" resultsCallback={this.resultCallback} textStrings={this.textStrings} disableContainerPadding={loadSite} source={loadSite ? { uri: 'https://carbondesignsystem.com' } : testDocument} forceView={forceType} />}
      </ScrollView>
    );
  }
}
