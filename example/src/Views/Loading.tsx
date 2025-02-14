import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Loading } from '@carbon/react-native';

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
  centerWrapping: {
    alignItems: 'center',
    marginBottom: 16,
  },
  itemStyle: {
    marginBottom: 16,
  },
});

export default class TestLoading extends React.Component {
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.centerWrapping}>
          <Loading />
        </View>
        <View style={styles.centerWrapping}>
          <Loading type="medium" />
        </View>
        <View style={styles.centerWrapping}>
          <Loading type="small" />
        </View>
        <View style={styles.itemStyle}>
          <Loading type="large" />
        </View>
        <View style={styles.itemStyle}>
          <Loading type="medium" />
        </View>
        <View style={styles.itemStyle}>
          <Loading type="small" />
        </View>
      </ScrollView>
    );
  }
}
