import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { DateInput } from '@carbon/react-native';

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

export default class TestDateInput extends React.Component {
  state = {
    value1: '',
    value2: '01/02/1995',
    value3: '',
    value4: '',
    value5: '',
    value6: '12/25/1985',
    value7: '',
  };

  private changeText = (field: string, value: string): void => {
    this.setState({ [field]: value });
  };

  render() {
    const { value1, value2, value3, value4, value5, value6, value7 } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <DateInput label="Text box" value={value1} helperText="I am helper text" onChangeText={(value) => this.changeText('value1', value)} />
        </View>
        <View style={styles.itemStyle}>
          <DateInput label="Text box with really long label that is probably going to wrap on most screens" value={value2} onChangeText={(value) => this.changeText('value2', value)} />
        </View>
        <View style={styles.itemStyle}>
          <DateInput label="I should have placeholder text" value={value3} placeholder="I am placeholder text" onChangeText={(value) => this.changeText('value3', value)} />
        </View>
        <View style={styles.itemStyle}>
          <DateInput label="I should have everything" value={value4} placeholder="Here is a g for checking carbon" helperText="I am helper text that is really long explaining how this input should work and stuff" onChangeText={(value) => this.changeText('value4', value)} />
        </View>
        <View style={styles.itemStyle}>
          <DateInput label="I am required" required={true} value={value5} placeholder="Set me and clear me" onChangeText={(value) => this.changeText('value5', value)} getErrorText={() => 'Item is required'} />
        </View>
        <View style={styles.itemStyle}>
          <DateInput label="I can be invalid" isInvalid={(value) => value?.toLowerCase().indexOf('https') !== 0} value={value7} placeholder="I must start with https or will error" onChangeText={(value) => this.changeText('value7', value)} getErrorText={() => 'Must start with https'} />
        </View>
        <View style={styles.itemStyle}>
          <DateInput label="I am disabled" disabled={true} value={value6} onChangeText={(value) => this.changeText('value6', value)} />
        </View>
      </ScrollView>
    );
  }
}
