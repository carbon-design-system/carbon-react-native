import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    paddingTop: 32,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  baseSpacing: {
    marginBottom: 16,
  },
});

export default class TestText extends React.Component {
  private textTypes = ['code-01', 'code-02', 'label-01', 'label-02', 'helper-text-01', 'helper-text-02', 'legal-01', 'legal-02', 'body-compact-01', 'body-compact-02', 'body-01', 'body-02', 'heading-compact-01', 'heading-compact-02', 'heading-01', 'heading-02', 'heading-03', 'heading-04', 'heading-05', 'heading-06', 'heading-07'];

  render(): React.ReactNode {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        {this.textTypes.map((type) => (
          <Text key={type} style={styles.baseSpacing} type={type as any} text={type.replace('-', ' ')} />
        ))}
      </ScrollView>
    );
  }
}
