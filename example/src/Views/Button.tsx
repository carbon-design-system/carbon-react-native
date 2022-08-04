import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Checkbox, Text } from 'carbon-react-native';
import AddIcon from '@carbon/icons/es/add/20';

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

export default class TestButton extends React.Component {
  state = {
    disabled: false,
    not100: false,
  }

  private alert = (text: string): void => {
    Alert.alert(text);
  }

  render(): React.ReactNode {
    const {disabled, not100} = this.state;
    const itemStyle = {marginBottom: 16} as any;

    if (not100) {
      itemStyle.alignSelf = 'flex-start';
    }

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Buttons" />
        <Checkbox checked={not100} id="not100" onPress={value => this.setState({not100: value})} label="Use flex-start align" />
        <Checkbox checked={disabled} id="disabled" onPress={value => this.setState({disabled: value})} label="Disabled" />
        <Button style={itemStyle} disabled={disabled} text="Default" onPress={() => {this.alert('Pressed default')}} onLongPress={() => {this.alert('Long pressed default')}} />
        <Button style={itemStyle} disabled={disabled} text="Primary" kind="primary" onPress={() => {this.alert('Pressed primary')}} onLongPress={() => {this.alert('Long pressed primary')}} />
        <Button style={itemStyle} disabled={disabled} text="Secondary" kind="secondary" onPress={() => {this.alert('Pressed secondary')}} onLongPress={() => {this.alert('Long pressed secondary')}} />
        <Button style={itemStyle} disabled={disabled} text="Tertiary" kind="tertiary" onPress={() => {this.alert('Pressed tertiary')}} onLongPress={() => {this.alert('Long pressed tertiary')}} />
        <Button style={itemStyle} disabled={disabled} text="Ghost" kind="ghost" onPress={() => {this.alert('Pressed ghost')}} onLongPress={() => {this.alert('Long pressed ghost')}} />
        <Button style={itemStyle} disabled={disabled} text="Danger" kind="danger" onPress={() => {this.alert('Pressed danger')}} onLongPress={() => {this.alert('Long pressed danger')}} />
        <Button style={itemStyle} disabled={disabled} text="Icon only mode" iconOnlyMode={true} kind="primary" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} text="Icon only mode" iconOnlyMode={true} kind="secondary" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} text="Icon only mode" iconOnlyMode={true} kind="tertiary" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} text="Icon only mode" iconOnlyMode={true} kind="ghost" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} text="Icon only mode" iconOnlyMode={true} kind="danger" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="primary" text="With icon" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="secondary" text="With icon" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="tertiary" text="With icon" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="ghost" text="With icon" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="danger" text="With icon" icon={AddIcon} onPress={() => {this.alert('Pressed icon')}} onLongPress={() => {this.alert('Long pressed icon')}} />
      </ScrollView>
    );
  }
}
