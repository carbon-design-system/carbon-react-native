import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { ToolbarButton, Checkbox, BottomToolbarPrimaryAction, RadioButton, getColor } from '@carbon/react-native';
import DashboardIcon from '@carbon/icons/es/dashboard/20';
import MapIcon from '@carbon/icons/es/map/20';
import AddIcon from '@carbon/icons/es/add/24';

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  appBreaker: {
    backgroundColor: getColor('tagBackgroundMagenta'),
    height: 20,
  },
});

export default class TestBottomToolbarPrimaryAction extends React.Component {
  state = {
    disabled: false,
    disabledAction: false,
    type: 'center',
    noItems: false,
  };

  private get items(): ToolbarButton[] {
    const { disabled } = this.state;

    return [
      {
        text: 'Dashboard',
        icon: DashboardIcon,
        alignItem: 'left',
        onPress: () => {
          Alert.alert('Pressed dashboard');
        },
      },
      {
        text: 'Map',
        icon: MapIcon,
        disabled: disabled,
        onPress: () => {
          Alert.alert('Pressed map');
        },
      },
    ];
  }

  render() {
    const { disabled, type, noItems, disabledAction } = this.state;

    const textTypes: any = {
      center: 'Center button',
      left: 'Left button',
      right: 'Right button',
    };

    let itemsToUseLeft = this.items;
    let itemsToUseRight = this.items;

    if (type === 'left') {
      itemsToUseRight = [...itemsToUseRight, ...itemsToUseLeft];
    } else if (type === 'right') {
      itemsToUseLeft = [...itemsToUseRight, ...itemsToUseLeft];
    }

    if (noItems) {
      itemsToUseLeft = [];
      itemsToUseRight = [];
    }

    return (
      <View style={styles.parentView}>
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
          {Object.keys(textTypes).map((item) => (
            <RadioButton key={item} checked={type === item} id={item} label={textTypes[item]} onPress={() => this.setState({ type: item })} />
          ))}
          <Checkbox checked={disabled} id="disabled" onPress={(value) => this.setState({ disabled: value })} label="Disable second item" />
          <Checkbox checked={disabledAction} id="disabledAction" onPress={(value) => this.setState({ disabledAction: value })} label="Disable primary action" />
          <Checkbox checked={noItems} id="noItems" onPress={(value) => this.setState({ noItems: value })} label="No items only primary action" />
        </ScrollView>
        <BottomToolbarPrimaryAction leftItems={itemsToUseLeft} disabled={disabledAction} rightItems={itemsToUseRight} position={type as any} icon={AddIcon} text="Primary action" onPress={() => Alert.alert('Pressed primary button')} />
        <View style={styles.appBreaker} />
      </View>
    );
  }
}
