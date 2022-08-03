import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { NumberInput, Text } from 'carbon-react-native';

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

export default class TestNumberInput extends React.Component {
  state = {
    value1: '',
    value2: '30',
    value3: '',
    value4: '',
    value5: '',
    value6: '500',
    value7: '',
  };

  private changeText = (field: string, value: string): void => {
    this.setState({[field]: value});
  };

  render(): React.ReactNode {
    const {value1, value2, value3, value4, value5, value6, value7} = this.state;
    const itemStyle = {};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Number Input" />
        <View style={itemStyle}><NumberInput label="Text box" value={value1} helperText="I am helper text" onChangeText={value => this.changeText('value1', value)} /></View>
        <View style={itemStyle}><NumberInput numberRules={{min: 0}} label="Text box with really long label that is probably going to wrap on most screens" value={value2} onChangeText={value => this.changeText('value2', value)} /></View>
        <View style={itemStyle}><NumberInput numberRules={{min: 1, max: 10}} label="I should have placeholder text" value={value3} placeholder="I am placeholder text" onChangeText={value => this.changeText('value3', value)} /></View>
        <View style={itemStyle}><NumberInput label="I should have everything" value={value4} placeholder="I am placeholder text" helperText="I am helper text that is really long explaining how this input should work and stuff. I also override and set 220 px height" textAreaMinHeight={220} onChangeText={value => this.changeText('value4', value)} /></View>
        <View style={itemStyle}><NumberInput label="I am required" required={true} value={value5} placeholder="Set me and clear me" onChangeText={value => this.changeText('value5', value)} getErrorText={() => 'Item is required'} /></View>
        <View style={itemStyle}><NumberInput label="I can be invalid" isInvalid={value => value?.toLowerCase().indexOf('https') !== 0} value={value7} placeholder="I must start with https or will error" onChangeText={value => this.changeText('value7', value)} getErrorText={() => 'Must start with https'} /></View>
        <View style={itemStyle}><NumberInput label="I am disabled" disabled={true} value={value6} onChangeText={value => this.changeText('value6', value)} /></View>
      </ScrollView>
    );
  }
}
