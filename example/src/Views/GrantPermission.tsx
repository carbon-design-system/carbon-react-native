import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, GrantPermission, RadioButton, Text } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
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
    Alert.alert(result ? 'You accepted this flow' : 'You did not accept the flow', 'Your app should abort the flow if not accepted. If accepted move forward requesting access to the item via OS.');
  };

  render(): React.ReactNode {
    const { open, type } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text text="Type" type="label-02" />
        <RadioButton checked={type === 'files'} id="files" label="Files" onPress={() => this.setState({ type: 'files' })} />
        <RadioButton checked={type === 'camera'} id="camera" label="Camera" onPress={() => this.setState({ type: 'camera' })} />
        <RadioButton checked={type === 'notifications'} id="notifications" label="Notifications" onPress={() => this.setState({ type: 'notifications' })} />
        <RadioButton checked={type === 'location'} id="location" label="Location" onPress={() => this.setState({ type: 'location' })} />
        <Button onPress={this.open} text="Trigger permission grant" />
        {open && <GrantPermission type={type} title="Grant access" resultsCallback={this.resultCallback} reasoning="In order for Carbon React Native test to retrieve the content you intend to act on, we will need access to your photos. This will be used for upload purposes only." additionalReasoning="Please allow Carbon React Native test to access your photos when you are prompted." continueText="Show prompt" cancelText="Cancel" />}
      </ScrollView>
    );
  }
}
