import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { RadioButton } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  itemStyle: {},
});

export default class TestRadioButton extends React.Component {
  state = {
    value: 'value1',
  };

  private changeText = (field: string): void => {
    this.setState({ value: field });
  };

  render(): React.ReactNode {
    const { value } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-1" label="Radio button" checked={value === 'value1'} onPress={() => this.changeText('value1')} />
        </View>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-2" label="Radio button no label" hideLabel={true} checked={value === 'value2'} onPress={() => this.changeText('value2')} />
        </View>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-3" label="Radio button disabled" disabled={true} checked={value === 'value3'} onPress={() => this.changeText('value3')} />
        </View>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-4" label="Radio button with long string that will wrap on smaller screens due to max size and stuff." checked={value === 'value4'} onPress={() => this.changeText('value4')} />
        </View>
      </ScrollView>
    );
  }
}
