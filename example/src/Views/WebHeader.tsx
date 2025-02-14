import React from 'react';
import { StyleSheet, ScrollView, Alert, View } from 'react-native';
import { Checkbox, WebHeader, WebHeaderAction } from '@carbon/react-native';
import InformationIcon from '@carbon/icons/es/information/20';
import HomeIcon from '@carbon/icons/es/home/20';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  baseSpacing: {
    marginBottom: 16,
  },
  controls: {
    padding: 16,
  },
});

export default class TestWebHeader extends React.Component {
  state = {
    showActions: true,
  };

  private get headerActions(): WebHeaderAction[] {
    return [
      {
        text: 'Information',
        icon: InformationIcon,
        onPress: () => {
          Alert.alert('Pressed info');
        },
      },
      {
        text: 'Go home',
        icon: HomeIcon,
        onPress: () => {
          Alert.alert('Pressed home');
        },
      },
    ];
  }

  render() {
    const { showActions } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.controls}>
          <Checkbox checked={showActions} id="showActions" onPress={(value) => this.setState({ showActions: value })} label="Show actions" />
        </View>
        <WebHeader style={styles.baseSpacing} mainName="IBM" secondaryName="Carbon" actions={showActions ? this.headerActions : undefined} />
        <WebHeader style={styles.baseSpacing} mainName="Long name for main" secondaryName="Even longer text for secondary" actions={showActions ? this.headerActions : undefined} />
        <WebHeader style={styles.baseSpacing} mainName="IBM" secondaryName="Long name for secondary text" actions={showActions ? this.headerActions : undefined} />
      </ScrollView>
    );
  }
}
