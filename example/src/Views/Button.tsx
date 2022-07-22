import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'carbon-react-native';
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
  }

  render(): React.ReactNode {
    const {disabled} = this.state;
    const itemStyle = {marginBottom: 16};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Buttons" />
        <Button style={itemStyle} disabled={disabled} text="Default" onPress={() => {console.info('Pressed default')}} onLongPress={() => {console.info('Long pressed default')}} />
        <Button style={itemStyle} disabled={disabled} text="Primary" kind="primary" onPress={() => {console.info('Pressed primary')}} onLongPress={() => {console.info('Long pressed primary')}} />
        <Button style={itemStyle} disabled={disabled} text="Secondary" kind="secondary" onPress={() => {console.info('Pressed secondary')}} onLongPress={() => {console.info('Long pressed secondary')}} />
        <Button style={itemStyle} disabled={disabled} text="Tertiary" kind="tertiary" onPress={() => {console.info('Pressed tertiary')}} onLongPress={() => {console.info('Long pressed tertiary')}} />
        <Button style={itemStyle} disabled={disabled} text="Ghost" kind="ghost" onPress={() => {console.info('Pressed ghost')}} onLongPress={() => {console.info('Long pressed ghost')}} />
        <Button style={itemStyle} disabled={disabled} text="Danger" kind="danger" onPress={() => {console.info('Pressed danger')}} onLongPress={() => {console.info('Long pressed danger')}} />
        <Button style={itemStyle} disabled={disabled} kind="primary" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="secondary" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="tertiary" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="ghost" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="danger" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="primary" text="With icon" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="secondary" text="With icon" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="tertiary" text="With icon" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="ghost" text="With icon" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} disabled={disabled} kind="danger" text="With icon" icon={AddIcon} onPress={() => {console.info('Pressed icon')}} onLongPress={() => {console.info('Long pressed icon')}} />
        <Button style={itemStyle} text="Toggle disabled" kind="primary" onPress={() => {this.setState({disabled: !disabled})}} />
      </ScrollView>
    );
  }
}
