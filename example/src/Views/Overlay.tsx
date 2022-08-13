import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Overlay, Button } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  innerView: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  overlay: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }
});

export default class TestOverlay extends React.Component {
  render(): React.ReactNode {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Overlay style={styles.overlay} />
        <View style={styles.innerView}>
          <Text style={{marginBottom: 16}} type="heading-04" text="Overlay" />
          <Text style={{marginTop: 20}} text="I am text under the overlay" />
          <Button style={{marginTop: 20}} text="Button under overlay" onPress={() => {}} />
        </View>
      </ScrollView>
    );
  }
}
