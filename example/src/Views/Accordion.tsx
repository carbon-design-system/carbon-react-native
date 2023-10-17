import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Accordion, Button, Text } from '@carbon/react-native';

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
  itemStyle: {
    marginTop: 8,
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
          <Text text="I am the content of this accordion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        </Accordion>
        <Accordion title="I am disabled" disabled={true}>
          <Text text="I am the content of this accordion" />
        </Accordion>
        <Accordion title="I am already opened on load and have long text" open={true}>
          <Text text="I am the content of this accordion" />
          <Button text="Click me to toggle the one below" onPress={() => this.setState({ openControl: !openControl })} style={styles.itemStyle} />
        </Accordion>
        <Accordion title="I can be controlled and have long text ellipsis" open={openControl} textBreakMode="tail">
          <Text type={'body-01'} text="Smaller text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        </Accordion>
      </ScrollView>
    );
  }
}
