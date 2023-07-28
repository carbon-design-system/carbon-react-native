import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Checkbox, List, Text } from '@carbon/react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  itemStyle: {
    marginBottom: 16,
  },
});

export default class TestList extends React.Component {
  state = {
    unordered: true,
    nested: false,
    longList: false,
  };

  private getLongList(neverNested?: boolean): (string | React.ReactNode)[] {
    const { nested, unordered, longList } = this.state;

    const getItem = (num: number): string | React.ReactNode => {
      if (nested && !neverNested && num === 1) {
        return (
          <>
            <Text text="Nested item parent" />
            <List type={unordered ? 'unordered' : 'ordered'} items={this.getLongList(true)} nested={true} />
          </>
        );
      }
      return num % 4 === 0 ? `Item ${num} with longer text for testing and seeing how it looks` : `Item ${num}`;
    };

    const results: (string | React.ReactNode)[] = [];
    let counter = 1;

    while (counter < (longList ? 800 : 200)) {
      results.push(getItem(counter));
      counter++;
    }

    return results;
  }

  render(): React.ReactNode {
    const { unordered, nested, longList } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={unordered} id="unordered" onPress={(value) => this.setState({ unordered: value })} label="Show unordered list" />
        <Checkbox checked={nested} id="nested" onPress={(value) => this.setState({ nested: value })} label="Add nested list" />
        <Checkbox checked={longList} id="nested" onPress={(value) => this.setState({ longList: value })} label="Super long list" />
        <View style={styles.itemStyle}>
          <List type={unordered ? 'unordered' : 'ordered'} items={this.getLongList()} />
        </View>
      </ScrollView>
    );
  }
}
