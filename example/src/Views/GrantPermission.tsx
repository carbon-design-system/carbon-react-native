import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, GrantPermission, RadioButton, Text } from '@carbon/react-native';

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

export default class TestGrantPermission extends React.Component {
  state = {
    open: false,
    type: 'files' as any,
  };

  private open = (): void => {
    this.setState({ open: true });
  };

  private resultCallback = (result: boolean): void => {
    this.setState({ open: false });
    Alert.alert(result ? 'You accepted this flow' : 'You did not accept the permission', result ? 'Your app should save that they have accepted and never show again unless terms change.' : 'Your app should abort the flow.');
  };

  private get reasoning(): string {
    const { type } = this.state;

    switch (type) {
      case 'files':
        return 'In order for us to retrieve the content you intend to upload, Carbon for Mobile will need access to your files. This will be used for upload purposes only.';
      case 'camera':
        return 'In order for us to share images you take to your network, Carbon for Mobile will need access to your camera. This will be used for sharing purposes only.';
      case 'notifications':
        return 'In order for us to keep you up to date with recent changes, Carbon for Mobile would like to send you notifications. This will be used for account updates.';
      case 'location':
      default:
        return 'In order for us to provide better search results for what is near you, Carbon for Mobile will need access to your location. This will be used for recommending nearby services only.';
    }
  }

  private get additionalReasoning(): string {
    const { type } = this.state;

    switch (type) {
      case 'files':
        return 'Please allow Carbon for Mobile to access your files when you are prompted.';
      case 'camera':
        return 'Please allow Carbon for Mobile to access your camera when you are prompted.';
      case 'notifications':
        return 'Please allow Carbon for Mobile to send you notifications when you are prompted.';
      case 'location':
      default:
        return 'Please allow Carbon for Mobile to access your location when you are prompted.';
    }
  }

  render() {
    const { open, type } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text text="Type" type="label-02" />
        <RadioButton checked={type === 'files'} id="files" label="Files" onPress={() => this.setState({ type: 'files' })} />
        <RadioButton checked={type === 'camera'} id="camera" label="Camera" onPress={() => this.setState({ type: 'camera' })} />
        <RadioButton checked={type === 'notifications'} id="notifications" label="Notifications" onPress={() => this.setState({ type: 'notifications' })} />
        <RadioButton checked={type === 'location'} id="location" label="Location" onPress={() => this.setState({ type: 'location' })} />
        <Button onPress={this.open} text="Trigger permission grant" style={styles.itemStyle} />
        {open && <GrantPermission type={type} title="Grant access" resultsCallback={this.resultCallback} reasoning={this.reasoning} additionalReasoning={this.additionalReasoning} continueText="Continue" cancelText="Cancel" />}
      </ScrollView>
    );
  }
}
