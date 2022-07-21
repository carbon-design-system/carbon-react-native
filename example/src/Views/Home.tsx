import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Button, Text} from 'carbon-react-native'
import type { ViewType } from '../App';

interface TestHomeProps {
  changeView: (view: ViewType) => void;
}

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

export default class TestHome extends React.Component<TestHomeProps> {
  render(): React.ReactNode {
    const {changeView} = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Components" />
        <Button style={{marginBottom: 8}} onPress={() => changeView('text')} text="Text" />
        <Button style={{marginBottom: 8}} onPress={() => changeView('button')} text="Button" />
      </ScrollView>
    );
  }
}
