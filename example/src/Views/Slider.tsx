import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Slider } from 'carbon-react-native';

const minValue = 0;
const maxValue = 100;

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
    marginBottom: 16,
  },
});

export default class TestSlider extends React.Component {
  state = {
    value1: 50,
    value2: 50,
    value3: 50,
  };

  render(): React.ReactNode {
    const { value1, value2, value3 } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <Slider id="slider-1" label="Slider" value={value1} minValue={minValue} maxValue={maxValue} />
        </View>
        <View style={styles.itemStyle}>
          <Slider id="slider-1" label="Slider no label" hideLabel={true} value={value2} minValue={minValue} maxValue={maxValue} />
        </View>
        <View style={styles.itemStyle}>
          <Slider id="slider-2" label="Slider no text input" hideTextInput={true} value={value3} minValue={minValue} maxValue={maxValue} />
        </View>
        <View style={styles.itemStyle}>
          <Slider id="slider-2" label="Slider disabled" disabled={true} value={value3} minValue={minValue} maxValue={maxValue} />
        </View>
      </ScrollView>
    );
  }
}
