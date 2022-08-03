import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Tile, Text } from 'carbon-react-native';

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

export default class TestTile extends React.Component {
  private alert = (text: string): void => {
    Alert.alert(text);
  }

  render(): React.ReactNode {
    const itemStyle = {marginBottom: 16};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Tile" />
        <View style={itemStyle}><Tile></Tile></View>
        <View style={itemStyle}><Tile type="default"><Text text='Default type' /></Tile></View>
        <View style={itemStyle}>
          <Tile type="scroll" style={{maxHeight: 90}}>
            <Text text='Scrolling content 1' />
            <Text text='Scrolling content 2' />
            <Text text='Scrolling content 3' />
            <Text text='Scrolling content 4' />
            <Text text='Scrolling content 5' />
            <Text text='Scrolling content 6' />
            <Text text='Scrolling content 7' />
            <Text text='Scrolling content 8' />
            <Text text='Scrolling content 9' />
            <Text text='Scrolling content 10' />
          </Tile>
        </View>
        <View style={itemStyle}><Tile type="clickable" onPress={() => this.alert('Pressed tile')} onLongPress={() => this.alert('Long pressed tile')}><Text text='You can click me' /></Tile></View>
      </ScrollView>
    );
  }
}
