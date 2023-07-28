import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Toggle } from '@carbon/react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    paddingTop: 8,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  itemStyle: {},
});

export default class TestToggle extends React.Component {
  state = {
    value1: false,
    value2: true,
    value3: false,
    value4: false,
    value5: false,
  };

  private changeText = (field: string, value: boolean): void => {
    this.setState({ [field]: value });
  };

  render(): React.ReactNode {
    const { value1, value2, value3, value4, value5 } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <Toggle label="Text box" toggled={value1} helperText="I am helper text" onChange={(value) => this.changeText('value1', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Toggle label="Text box with really long label that is probably going to wrap on most screens" toggled={value2} onChange={(value) => this.changeText('value2', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Toggle label="I should have on/off text" selectedLabelText={{ on: 'On', off: 'Off' }} toggled={value3} onChange={(value) => this.changeText('value3', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Toggle label="I should have everything" toggled={value4} helperText="I am helper text that is really long explaining how this input should work and stuff" onChange={(value) => this.changeText('value4', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Toggle label="I am disabled" disabled={true} toggled={value5} onChange={(value) => this.changeText('value5', value)} />
        </View>
      </ScrollView>
    );
  }
}
