import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Menu, MenuItemProps } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  itemStyle: {
    marginBottom: 16,
  },
});

export default class TestMenu extends React.Component {
  private alert = (text: string): void => {
    Alert.alert(text);
  };

  private get regular(): MenuItemProps[] {
    return [
      {
        text: 'Item 1',
        onPress: () => this.alert('Item 1 pressed'),
        onLongPress: () => this.alert('Item 1 long pressed'),
      },
      {
        text: 'Item 2 with really long text that will go into ellipsis instead of wrapping like the one below',
        textBreakMode: 'tail',
        onPress: () => this.alert('Item 2 pressed'),
      },
      {
        text: 'Item 3',
        disabled: true,
        onPress: () => this.alert('Item 3 pressed'),
        onLongPress: () => this.alert('Item 3 long pressed'),
      },
      {
        text: 'Item 4 with really long name for wrapping the text and not going to ellipsis',
        onPress: () => this.alert('Item 4 pressed'),
        onLongPress: () => this.alert('Item 4 long pressed'),
      },
    ];
  }

  private get many(): MenuItemProps[] {
    const getItem = (num: number): MenuItemProps => {
      return {
        text: `Item ${num}`,
        onPress: () => this.alert(`Item ${num} pressed`),
        onLongPress: () => this.alert(`Item ${num}1 long pressed`),
      };
    };

    const results: MenuItemProps[] = [];
    let counter = 1;

    while (counter < 12) {
      results.push(getItem(counter));
      counter++;
    }

    return results;
  }

  render(): React.ReactNode {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <Menu items={this.regular} />
        </View>
        <View style={styles.itemStyle}>
          <Menu items={this.many} />
        </View>
      </ScrollView>
    );
  }
}
