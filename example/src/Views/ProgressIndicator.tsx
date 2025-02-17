import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ProgressIndicator, Button, Text } from '@carbon/react-native';

const styles = StyleSheet.create({
  view: {
    padding: 0,
    paddingTop: 32,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  testNotFull: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
});

export default class TestProgressIndicator extends React.Component {
  state = {
    openControl: false,
  };

  render() {
    const { openControl } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <ProgressIndicator title="I am first. And already opened." status="complete" open={true} firstStep={true}>
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
        <ProgressIndicator title="I am disabled" status="complete" disabled={true}>
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
        <ProgressIndicator title="I am invalid" status="invalid">
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
        <ProgressIndicator title="I am next step" status="in-progress">
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
        <ProgressIndicator title="I am just a step" status="pending" subText="Optional">
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
        <ProgressIndicator title="I am just a step with really long text that is bad" status="pending" subText="Optional">
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
        <ProgressIndicator title="I am just another step with really long text that is bad" status="pending">
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
        <ProgressIndicator title="I am waiting">
          <Text text="I am the content of this accordion" />
          <Button text="Click me to toggle the one below" onPress={() => this.setState({ openControl: !openControl })} />
        </ProgressIndicator>
        <ProgressIndicator title="I can be controlled" open={openControl}>
          <Text text="I am the content of this accordion" />
        </ProgressIndicator>
      </ScrollView>
    );
  }
}
