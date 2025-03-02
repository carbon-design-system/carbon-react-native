import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Tag, Checkbox, TagTypes } from '@carbon/react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  baseSpacing: {
    marginTop: 16,
  },
  tags: {
    marginTop: 16,
  },
});

export default class TestTag extends React.Component {
  state = {
    disabled: false,
    showFilterClose: false,
    showWrapping: false,
  };

  private textTypes: TagTypes[] = ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray', 'high-contrast'];

  render(): React.ReactNode {
    const { disabled, showFilterClose, showWrapping } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={showFilterClose} id="filterClose" onPress={(value) => this.setState({ showFilterClose: value })} label="Show close" />
        <Checkbox checked={disabled} id="disable" onPress={(value) => this.setState({ disabled: value })} label="Make disabled" />
        <Checkbox checked={showWrapping} id="showWrapping" onPress={(value) => this.setState({ showWrapping: value })} label="Make all wrap" />
        <Tag style={styles.tags} title="Default with long text that is really long and probably going to wrap." breakMode={showWrapping ? 'wrap' : undefined} disabled={disabled} onClosePress={showFilterClose ? () => Alert.alert('Pressed filter close', 'default') : undefined} />
        {this.textTypes.map((type) => (
          <Tag key={type} style={styles.baseSpacing} tagType={type} title={type} disabled={disabled} breakMode={showWrapping ? 'wrap' : undefined} onClosePress={showFilterClose ? () => Alert.alert('Pressed filter close', type) : undefined} />
        ))}
      </ScrollView>
    );
  }
}
