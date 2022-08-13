import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Checkbox, Text } from 'carbon-react-native';

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

export default class TestCheckbox extends React.Component {
  state = {
    value1: false,
    value2: true,
    value3: false,
    value4: false,
  };

  private changeText = (field: string, value: boolean): void => {
    this.setState({[field]: value});
  };

  render(): React.ReactNode {
    const {value1, value2, value3, value4} = this.state;
    const itemStyle = {};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Checkbox" />
        <View style={itemStyle}><Checkbox id="check-box-1" label="Checkbox" checked={value1} onPress={value => this.changeText('value1', value)} /></View>
        <View style={itemStyle}><Checkbox id="check-box-1" label="Checkbox no label" hideLabel={true} checked={value2} onPress={value => this.changeText('value2', value)} /></View>
        <View style={itemStyle}><Checkbox id="check-box-2" label="Checkbox disabled" disabled={true} checked={value3} onPress={value => this.changeText('value3', value)} /></View>
        <View style={itemStyle}><Checkbox id="check-box-3" label="Checkbox with long string that will wrap on smaller screens due to max size and stuff." checked={value4} onPress={value => this.changeText('value4', value)} /></View>
      </ScrollView>
    );
  }
}
