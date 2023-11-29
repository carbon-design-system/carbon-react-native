import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { FormItem, openLink } from '@carbon/react-native';
import LaunchIcon from '@carbon/icons/es/launch/20';
import VolumeDownIcon from '@carbon/icons/es/volume--down/20';
import VolumeUpIcon from '@carbon/icons/es/volume--up/20';
import RadioIcon from '@carbon/icons/es/radio-button--checked/20';

const styles = StyleSheet.create({
  view: {
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
    marginBottom: 16,
  },
});

export default class TestFormItem extends React.Component {
  state = {
    firstName: '',
    password: '',
    textArea: '',
    age: '',
    birthDay: '',
    toggleTest: false,
    renderLeft: false,
    toggleInlineTest: false,
    volume: '35',
    paymentType: 'card',
  };

  private alert = (text: string): void => {
    Alert.alert(text);
  };

  render(): React.ReactNode {
    const { firstName, password, textArea, age, birthDay, toggleTest, volume, paymentType, renderLeft, toggleInlineTest } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <FormItem type="header" label="Choose payment type" helperText="Select a payment type to complete purchase" />
        <FormItem type="checkbox" renderToggleCheckboxLeft={renderLeft} overrideActiveCheckboxIcon={RadioIcon} label="Credit card" helperText="All major cards accepted" value={paymentType === 'card'} onChange={() => this.setState({ paymentType: 'card' })} />
        <FormItem type="checkbox" renderToggleCheckboxLeft={renderLeft} overrideActiveCheckboxIcon={RadioIcon} label="Electronic check" value={paymentType === 'check'} onChange={() => this.setState({ paymentType: 'check' })} />
        <FormItem type="checkbox" renderToggleCheckboxLeft={renderLeft} overrideActiveCheckboxIcon={RadioIcon} label="Cash on delivery" value={paymentType === 'cash'} onChange={() => this.setState({ paymentType: 'cash' })} />
        <FormItem type="header" label="Example header" helperText="Helper text to explain what the form section below includes" />
        <FormItem type="text" label="First name" helperText="This will be your first name" value={firstName} onChange={(value) => this.setState({ firstName: value })} textInputProps={{ required: true, getErrorText: () => 'Item is required', placeholder: 'Required' }} />
        <FormItem type="toggle-inline" label="Inline toggle" value={toggleInlineTest} renderToggleCheckboxLeft={renderLeft} onChange={(value) => this.setState({ toggleInlineTest: value })} toggleValueText={(value) => (value ? 'Yes' : 'No')} />
        <FormItem type="toggle" label="Raise to wake" value={toggleTest} renderToggleCheckboxLeft={renderLeft} onChange={(value) => this.setState({ toggleTest: value })} toggleValueText={(value) => (value ? 'On' : 'Off')} />
        <FormItem type="toggle" label="Move to left" helperText="Move checkbox/toggle to left side" value={renderLeft} renderToggleCheckboxLeft={renderLeft} onChange={(value) => this.setState({ renderLeft: value })} toggleValueText={(value) => (value ? 'On' : 'Off')} />
        <FormItem type="password" label="Password" value={password} onChange={(value) => this.setState({ password: value })} />
        <FormItem type="text-area" lastItem={true} label="Text area" value={textArea} onChange={(value) => this.setState({ textArea: value })} />
        <FormItem type="header" label="Additional content" helperText="Provide more info here" />
        <FormItem type="number" label="Age" value={age} onChange={(value) => this.setState({ age: value })} />
        <FormItem type="date" label="Birth date" value={birthDay} onChange={(value) => this.setState({ birthDay: value })} textInputProps={{ placeholder: 'mm/dd/yyyy' }} />
        <FormItem type="slider" label="Volume" value={volume} onChange={(value) => this.setState({ volume: value })} sliderProps={{ hideRangeLabels: true, leftIcon: VolumeDownIcon, rightIcon: VolumeUpIcon }} />
        <FormItem type="button" onPress={() => openLink('https://carbondesignsystem.com')} label="Learn more about Carbon" helperText="Opens in web browser" buttonIcon={LaunchIcon} />
        <FormItem type="button" lastItem={true} onPress={() => this.alert('Pressed to edit item')} label="Edit an item in another place" />
        <FormItem type="divider" />
        <FormItem type="static" label="Device info" value="Generic Device" />
        <FormItem type="static" label="Version" value="OS 5.23.2" />
        <FormItem type="static" lastItem={true} label="Serial number" value="8SF94GVSA" helperText="Device serial number is not real." />
      </ScrollView>
    );
  }
}
