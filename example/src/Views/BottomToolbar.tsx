import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Text, ToolbarButton, Checkbox, BottomToolbar, RadioButton } from 'carbon-react-native';
import DashboardIcon from '@carbon/icons/es/dashboard/20';
import MapIcon from '@carbon/icons/es/map/20';
import ActivityIcon from '@carbon/icons/es/activity/20';
import CollaborateIcon from '@carbon/icons/es/collaborate/20';
import FavoriteIcon from '@carbon/icons/es/favorite--filled/20';

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
});

export default class TestBottomToolbar extends React.Component {
  state = {
    disabled: false,
    type: 'even',
  };

  private get items(): ToolbarButton[] {
    const {disabled} = this.state;

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
      {
        text: 'Collaborate',
        icon: CollaborateIcon,
        onPress: () => {
          Alert.alert('Pressed collaborate');
        },
      },
      {
        text: 'Current long name that has to be cut',
        icon: ActivityIcon,
        onPress: () => {
          Alert.alert('Pressed long name text');
        },
      },
      {
        text: 'Favorites',
        alignItem: 'right',
        icon: FavoriteIcon,
        onPress: () => {
          Alert.alert('Pressed favorites');
        },
      },
    ];
  }

  private get getThreeItems(): ToolbarButton[] {
    const {disabled} = this.state;

    return [
      {
        text: 'Left',
        icon: DashboardIcon,
        alignItem: 'left',
        onPress: () => {
          Alert.alert('Pressed left');
        },
      },
      {
        text: 'Center',
        icon: MapIcon,
        disabled: disabled,
        onPress: () => {
          Alert.alert('Pressed center');
        },
      },
      {
        text: 'Right',
        icon: CollaborateIcon,
        alignItem: 'right',
        onPress: () => {
          Alert.alert('Pressed right');
        },
      },
    ];
  }

  render(): React.ReactNode {
    const {disabled, type} = this.state;

    const textTypes: any = {
      'even': 'Even distributed items',
      'left-right': 'Left right aligned icons',
      'left-right-text': 'Left right aligned text',
      'left-right-center': 'Left right and center aligned icons',
      'left-right-center-text': 'Left right and center aligned text',
    }

    let itemsTouse = this.items;

    if (type === 'left-right') {
      itemsTouse = this.getThreeItems;
      itemsTouse.splice(1, 1);
    } else if (type === 'left-right-text') {
      itemsTouse = this.getThreeItems;
      itemsTouse.splice(1, 1);
      itemsTouse.forEach(item => item.icon = undefined);
    } else if (type === 'left-right-center') {
      itemsTouse = this.getThreeItems;
    } else if (type === 'left-right-center-text') {
      itemsTouse = this.getThreeItems;
      itemsTouse.forEach(item => item.icon = undefined);
    }

    return (
      <View style={styles.parentView}>
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
          <Text style={{marginBottom: 16}} type="heading-04" text="Bottom toolbar" />
          {Object.keys(textTypes).map(item => <RadioButton key={item} checked={type === item} id={item} label={textTypes[item]} onPress={() => this.setState({type: item})} />)}
          <Checkbox checked={disabled} id="disabled" onPress={value => this.setState({disabled: value})} label="Disable second item" />
        </ScrollView>
        <BottomToolbar items={itemsTouse} />
      </View>
    );
  }
}
