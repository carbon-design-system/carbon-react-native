import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Loading, Text } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
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
});

export default class TestLoading extends React.Component {
  render(): React.ReactNode {
    const itemStyle = {marginBottom: 16};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Loading" />
        <View style={styles.centerWrapping}><Loading /></View>
        <View style={styles.centerWrapping}><Loading type="medium" /></View>
        <View style={styles.centerWrapping}><Loading type="small" /></View>
        <View style={itemStyle}><Loading type="large" /></View>
        <View style={itemStyle}><Loading type="medium" /></View>
        <View style={itemStyle}><Loading type="small" /></View>
      </ScrollView>
    );
  }
}
