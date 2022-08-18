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
    value1: false,
    value2: true,
    value3: false,
    value4: false,
  };

  private changeText = (field: string, value: boolean): void => {
    this.setState({ [field]: value });
  };

  render(): React.ReactNode {
    const { value1, value2, value3, value4 } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-1" label="Radio button" checked={value1} onPress={(value) => this.changeText('value1', value)} />
        </View>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-1" label="Radio button no label" hideLabel={true} checked={value2} onPress={(value) => this.changeText('value2', value)} />
        </View>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-2" label="Radio button disabled" disabled={true} checked={value3} onPress={(value) => this.changeText('value3', value)} />
        </View>
        <View style={styles.itemStyle}>
          <RadioButton id="check-box-3" label="Radio button with long string that will wrap on smaller screens due to max size and stuff." checked={value4} onPress={(value) => this.changeText('value4', value)} />
        </View>
      </ScrollView>
    );
  }
}
