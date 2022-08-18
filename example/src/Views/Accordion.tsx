import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Accordion, Button, Text } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
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

export default class TestAccordion extends React.Component {
  state = {
    openControl: false,
  };

  render(): React.ReactNode {
    const { openControl } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Accordion title="I am first. You can open me." firstAccordion={true}>
          <Text text="I am the content of this accordion" />
        </Accordion>
        <Accordion title="I am disabled" disabled={true}>
          <Text text="I am the content of this accordion" />
        </Accordion>
        <Accordion title="I am already opened on load" open={true}>
          <Text text="I am the content of this accordion" />
          <Button text="Click me to toggle the one below" onPress={() => this.setState({ openControl: !openControl })} />
        </Accordion>
        <Accordion title="I can be controlled" open={openControl}>
          <Text text="I am the content of this accordion" />
        </Accordion>
      </ScrollView>
    );
  }
}
