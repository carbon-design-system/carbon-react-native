import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Link } from '@carbon/react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
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

export default class TestLink extends React.Component {
  private alert = (text: string): void => {
    Alert.alert(text);
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <Link onPress={() => this.alert('Pressed link')} onLongPress={() => this.alert('Long Pressed link')} text="Example link" />
        </View>
        <View style={styles.itemStyle}>
          <Link disabled={true} onPress={() => this.alert('Pressed link')} onLongPress={() => this.alert('Long Pressed link')} text="Example of disabled link" />
        </View>
        <View style={styles.testNotFull}>
          <Link onPress={() => this.alert('Pressed link. But had to click the text!')} onLongPress={() => this.alert('Long Pressed link')} text="Example link not full width" />
        </View>
        <View style={styles.itemStyle}>
          <Link onPress={() => this.alert('Pressed link')} onLongPress={() => this.alert('Long Pressed link')} text="Example link with really long text that should wrap and show how wrapping looks when really long text is used" />
        </View>
      </ScrollView>
    );
  }
}
