import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { createIcon, getColor, Text } from 'carbon-react-native';
import AddIcon from '@carbon/icons/es/add/20';
import CaretRightIcon from '@carbon/icons/es/caret--right/20';
import ArrowLeftIcon from '@carbon/icons/es/arrow--left/20';
import CodeIcon from '@carbon/icons/es/code/20';
import FavoriteIcon from '@carbon/icons/es/favorite/20';

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

export default class TestIcons extends React.Component {
  render(): React.ReactNode {
    const itemStyle = {marginBottom: 16};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Icons" />
        <View style={itemStyle}>{createIcon(AddIcon, 32, 32)}</View>
        <View style={itemStyle}>{createIcon(CaretRightIcon, 32, 32, getColor('interactive'))}</View>
        <View style={itemStyle}>{createIcon(ArrowLeftIcon, 20, 20, getColor('supportError'))}</View>
        <View style={itemStyle}>{createIcon(CodeIcon, 16, 16, getColor('supportSuccess'))}</View>
        <View style={itemStyle}>{createIcon(FavoriteIcon, 60, 60, getColor('supportWarning'))}</View>
      </ScrollView>
    );
  }
}
