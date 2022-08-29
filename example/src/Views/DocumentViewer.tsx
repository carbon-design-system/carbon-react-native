import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Checkbox, DocumentViewer } from 'carbon-react-native';
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

export default class TestDocumentViewer extends React.Component {
  state = {
    open: false,
    forceIos: false,
    forceAndroid: false,
    loadSite: false,
  };

  private open = (): void => {
    this.setState({ open: true });
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
        <Button onPress={this.open} text="Open legal document" style={styles.itemStyle} />
        {open && <DocumentViewer title={loadSite ? 'Carbon Design System' : 'Test Document'} disableContainerPadding={loadSite} source={loadSite ? { uri: 'https://carbondesignsystem.com' } : testDocument} onDismiss={() => this.setState({ open: false })} dismissText="Done" forceView={forceType} />}
      </ScrollView>
    );
  }
}
