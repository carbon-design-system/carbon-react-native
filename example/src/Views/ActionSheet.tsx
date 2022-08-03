import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { ActionSheet, ActionSheetItem, Button, Checkbox, Text } from 'carbon-react-native';

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

export default class TestActionSheet extends React.Component {
  state = {
    open: false,
    showBody: true,
    forceCustom: false,
    lotItems: false,
  };

  private openActionSheeet = (): void => {
    this.setState({open: true});
  };

  private items: ActionSheetItem[] = [
    {
      text: 'Cancel',
      onPress: () => {
        this.setState({open: false});
      },
    },
    {
      text: 'Item 1',
      onPress: () => {
        Alert.alert('Pressed item 1 on action sheet');
        this.setState({open: false});
      },
    },
    {
      text: 'Item 2 wtih really long name that may be too long for many views',
      onPress: () => {
        Alert.alert('Pressed item 2 on action sheet');
        this.setState({open: false});
      },
    },
    {
      text: 'Item 3 that is hidden',
      hidden: true,
      onPress: () => {
        Alert.alert('Pressed item 3 on action sheet');
        this.setState({open: false});
      },
    },
    {
      text: 'Item 4',
      onPress: () => {
        Alert.alert('Pressed item 4 on action sheet');
        this.setState({open: false});
      },
    },
  ];

  render(): React.ReactNode {
    const {open, showBody, forceCustom, lotItems} = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Action Sheet" />
        <Checkbox checked={showBody} id="subtext" onPress={value => this.setState({showBody: value})} label="Show body" />
        <Checkbox checked={forceCustom} id="force" onPress={value => this.setState({forceCustom: value})} label="Force custom action sheeet" />
        <Checkbox checked={lotItems} id="lot" onPress={value => this.setState({lotItems: value})} label="Load lots of items" />
        <Button onPress={this.openActionSheeet} text="Open action sheet" />
        <ActionSheet open={open} title="Action sheet title" body={showBody ? 'Useful info about what this action sheet does' : undefined} cancelButtonIndex={0} items={lotItems ? [...this.items, ...this.items, ...this.items, ...this.items] : this.items} forceCustomActionSheet={forceCustom} />
      </ScrollView>
    );
  }
}
