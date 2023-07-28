import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Checkbox, DocumentViewer } from '@carbon/react-native';
import { testDocument } from '../constants/testDocument';
import WebView from 'react-native-webview';

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
  customWebView: {
    width: '100%',
    height: '100%',
  },
});

export default class TestDocumentViewer extends React.Component {
  state = {
    open: false,
    forceIos: false,
    forceAndroid: false,
    loadSite: false,
    loadCustomWebView: false,
  };

  private open = (): void => {
    this.setState({ open: true });
  };

  render(): React.ReactNode {
    const { open, forceIos, forceAndroid, loadSite, loadCustomWebView } = this.state;
    let forceType = undefined as 'android' | 'ios' | undefined;

    if (forceAndroid) {
      forceType = 'android';
    } else if (forceIos) {
      forceType = 'ios';
    }

    let mainView = <DocumentViewer title={loadSite ? 'Carbon Design System' : 'Test Document'} disableContainerPadding={loadSite} source={loadSite ? { uri: 'https://carbondesignsystem.com' } : testDocument} onDismiss={() => this.setState({ open: false })} dismissText="Done" forceView={forceType} />;

    if (loadCustomWebView) {
      mainView = <DocumentViewer title="Custom Web View" disableScrollView={true} disableContainerPadding={true} sourceNode={<WebView source={{ uri: 'https://carbondesignsystem.com' }} style={styles.customWebView} />} onDismiss={() => this.setState({ open: false })} dismissText="Done" forceView={forceType} />;
    }

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={forceIos} id="forceIos" onPress={(value) => this.setState({ forceIos: value })} label="Force iOS mode" />
        <Checkbox checked={forceAndroid} id="forceAndroid" onPress={(value) => this.setState({ forceAndroid: value })} label="Force Android mode" />
        <Checkbox checked={loadSite} id="loadSite" onPress={(value) => this.setState({ loadSite: value })} label="Load website" />
        <Checkbox checked={loadCustomWebView} id="loadCustomWebView" onPress={(value) => this.setState({ loadCustomWebView: value })} label="Load custom web view (disable scroll view)" />
        <Button onPress={this.open} text="Open legal document" style={styles.itemStyle} />
        {open && mainView}
      </ScrollView>
    );
  }
}
