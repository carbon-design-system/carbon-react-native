import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Pagination, Text } from 'carbon-react-native';

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

export default class TestPagination extends React.Component {
  state = {
    page1: 1,
    page2: 4,
    page3: 1,
  };

  render(): React.ReactNode {
    const {page1, page2, page3} = this.state;
    const itemStyle = {marginBottom: 16};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Pagination" />
        <View style={itemStyle}><Pagination onPageChange={page => this.setState({page1: page})} totalPages={3} currentPage={page1} /></View>
        <View style={itemStyle}><Pagination onPageChange={page => this.setState({page2: page})} totalPages={10} currentPage={page2} /></View>
        <View style={itemStyle}><Pagination onPageChange={page => this.setState({page3: page})} totalPages={30} currentPage={page3} /></View>
      </ScrollView>
    );
  }
}
