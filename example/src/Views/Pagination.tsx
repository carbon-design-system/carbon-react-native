import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Pagination } from 'carbon-react-native';

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

export default class TestPagination extends React.Component {
  state = {
    page1: 1,
    page2: 4,
    page3: 1,
  };

  render(): React.ReactNode {
    const { page1, page2, page3 } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <Pagination onPageChange={(page) => this.setState({ page1: page })} totalPages={3} currentPage={page1} />
        </View>
        <View style={styles.itemStyle}>
          <Pagination onPageChange={(page) => this.setState({ page2: page })} totalPages={10} currentPage={page2} />
        </View>
        <View style={styles.itemStyle}>
          <Pagination onPageChange={(page) => this.setState({ page3: page })} totalPages={30} currentPage={page3} />
        </View>
      </ScrollView>
    );
  }
}
