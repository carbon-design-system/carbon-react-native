import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Checkbox, Text, TextInput, Modal } from 'carbon-react-native';

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

export default class TestModal extends React.Component {
  state = {
    open: false,
    showDescription: true,
    hasPrimary: true,
    hasSecondary: true,
    hasInputContent: false,
    textValue: '',
  };

  private openModal = (): void => {
    this.setState({ open: true });
  };

  private primaryPress = (): void => {
    this.setState({ open: false });
  };

  private secondaryPress = (): void => {
    this.setState({ open: false });
  };

  private get modalChild(): React.ReactNode {
    const { hasPrimary, hasSecondary, hasInputContent, textValue } = this.state;

    if (!hasPrimary && !hasSecondary) {
      return (
        <View>
          <Text text="You opened a modal with no actions... But you can control the modal from within for passive style modals." />
          <Button
            onPress={() => {
              this.setState({ open: false });
            }}
            text="Close modal"
            kind="ghost"
          />
        </View>
      );
    } else if (hasInputContent) {
      return (
        <View>
          <TextInput value={textValue} label="Text input in modal" onChangeText={(value) => this.setState({ textValue: value })} />
        </View>
      );
    } else {
      return (
        <View>
          <Text text="I am basic modal with some info that you may find useful" />
        </View>
      );
    }
  }

  render(): React.ReactNode {
    const { open, showDescription, hasPrimary, hasSecondary, hasInputContent } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={showDescription} id="subtext" onPress={(value) => this.setState({ showDescription: value })} label="Show description" />
        <Checkbox checked={hasPrimary} id="force" onPress={(value) => this.setState({ hasPrimary: value })} label="Has primary button" />
        <Checkbox checked={hasSecondary} id="force" onPress={(value) => this.setState({ hasSecondary: value })} label="Has secondary button" />
        <Checkbox checked={hasInputContent} id="force" onPress={(value) => this.setState({ hasInputContent: value })} label="Has input content" />
        <Button onPress={this.openModal} text="Open modal" />
        <Modal open={open} title="Modal title" description={showDescription ? 'Useful info about what this modal does' : undefined} primaryActionOnPress={hasPrimary ? this.primaryPress : undefined} primaryActionText="Action" secondaryActionOnPress={hasSecondary ? this.secondaryPress : undefined} secondaryActionText="Cancel">
          {this.modalChild}
        </Modal>
      </ScrollView>
    );
  }
}
