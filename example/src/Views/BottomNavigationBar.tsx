import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, NumberInput, BottomNavigationBar, NavigationButton, Checkbox, getColor } from '@carbon/react-native';
import DashboardIcon from '@carbon/icons/es/dashboard/20';
import MapIcon from '@carbon/icons/es/map/20';
import ActivityIcon from '@carbon/icons/es/activity/20';
import CollaborateIcon from '@carbon/icons/es/collaborate/20';
import MedicationIcon from '@carbon/icons/es/medication/20';
import FavoriteIcon from '@carbon/icons/es/favorite--filled/20';
import AccessibilityIcon from '@carbon/icons/es/accessibility--alt/20';
import UserIcon from '@carbon/icons/es/user--avatar/20';

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
  baseSpacing: {
    marginBottom: 16,
  },
});

export default class TestBottomNavigationBar extends React.Component {
  state = {
    disabled: false,
    total: '4',
    currentPage: 1,
  };

  private get items(): NavigationButton[] {
    const { currentPage, disabled } = this.state;

    return [
      {
        text: 'Dashboard',
        icon: DashboardIcon,
        active: currentPage === 1,
        onPress: () => {
          this.setState({ currentPage: 1 });
        },
      },
      {
        text: 'Map',
        icon: MapIcon,
        disabled: disabled,
        active: currentPage === 2,
        onPress: () => {
          this.setState({ currentPage: 2 });
        },
      },
      {
        text: 'Collaborate',
        icon: CollaborateIcon,
        active: currentPage === 3,
        onPress: () => {
          this.setState({ currentPage: 3 });
        },
      },
      {
        text: 'Current long name that has to be cut',
        icon: ActivityIcon,
        active: currentPage === 4,
        onPress: () => {
          this.setState({ currentPage: 4 });
        },
      },
      {
        text: 'Favorites',
        icon: FavoriteIcon,
        active: currentPage === 5,
        onPress: () => {
          this.setState({ currentPage: 5 });
        },
      },
      {
        text: 'Accessibility',
        icon: AccessibilityIcon,
        active: currentPage === 6,
        onPress: () => {
          this.setState({ currentPage: 6 });
        },
      },
      {
        text: 'Account',
        icon: UserIcon,
        active: currentPage === 7,
        onPress: () => {
          this.setState({ currentPage: 7 });
        },
      },
      {
        text: 'Medication',
        icon: MedicationIcon,
        active: currentPage === 8,
        onPress: () => {
          this.setState({ currentPage: 8 });
        },
      },
    ];
  }

  render(): React.ReactNode {
    const { total, currentPage, disabled } = this.state;

    const itemsToUse = this.items.slice(0, Number(total));
    const currentItem = itemsToUse[currentPage - 1];

    return (
      <View style={styles.parentView}>
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
          {!!currentItem && <Text style={styles.baseSpacing} type="heading-03" text={`Current page: ${currentItem?.text}`} />}
          <NumberInput value={total} label="Number of items to load" onChangeText={(value) => this.setState({ total: value })} numberRules={{ max: 5, min: 2 }} />
          <Checkbox checked={disabled} id="disabled" onPress={(value) => this.setState({ disabled: value })} label="Disable second item" />
        </ScrollView>
        <BottomNavigationBar items={itemsToUse} />
        <View style={styles.appBreaker} />
      </View>
    );
  }
}
