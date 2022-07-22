import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { createIcon, getColor, Text } from 'carbon-react-native';
import ArrowUpIcon from '@carbon/icons/es/arrow--up/20';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  iconTextInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  icon: {
    marginTop: -10,
  },
});

export default class TestHeader extends React.Component {
  render(): React.ReactNode {

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Header" />
        <View style={styles.iconTextInline}>
          <View style={styles.icon}>{createIcon(ArrowUpIcon, 60, 60, getColor('supportWarning'))}</View>
          <Text style={{marginBottom: 16}} type="heading-05" text="Look up" />
          <View style={styles.icon}>{createIcon(ArrowUpIcon, 60, 60, getColor('supportWarning'))}</View>
        </View>
      </ScrollView>
    );
  }
}
