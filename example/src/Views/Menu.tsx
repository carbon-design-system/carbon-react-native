import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Checkbox, Menu, MenuItemProps, getColor } from '@carbon/react-native';
import CodeIcon from '@carbon/icons/es/code/20';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    paddingTop: 32,
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
  state = {
    showIcons: false,
    changeIconColor: false,
    showDivider: false,
  };

  private alert = (text: string): void => {
    Alert.alert(text);
  };

  private get regular(): MenuItemProps[] {
    const { showIcons, changeIconColor, showDivider } = this.state;

    return [
      {
        text: 'Item 1',
        onPress: () => this.alert('Item 1 pressed'),
        onLongPress: () => this.alert('Item 1 long pressed'),
        icon: showIcons ? CodeIcon : undefined,
        iconColor: changeIconColor ? getColor('supportSuccess') : undefined,
        divider: showDivider,
      },
      {
        text: 'Item 2 with really long text that will go into ellipsis instead of wrapping like the one below',
        textBreakMode: 'tail',
        onPress: () => this.alert('Item 2 pressed'),
        icon: showIcons ? CodeIcon : undefined,
        iconColor: changeIconColor ? getColor('supportSuccess') : undefined,
        divider: showDivider,
      },
      {
        text: 'Item 3',
        disabled: true,
        onPress: () => this.alert('Item 3 pressed'),
        onLongPress: () => this.alert('Item 3 long pressed'),
        icon: showIcons ? CodeIcon : undefined,
        iconColor: changeIconColor ? getColor('supportSuccess') : undefined,
        divider: showDivider,
      },
      {
        text: 'Item 4 with really long name for wrapping the text and not going to ellipsis',
        onPress: () => this.alert('Item 4 pressed'),
        onLongPress: () => this.alert('Item 4 long pressed'),
        icon: showIcons ? CodeIcon : undefined,
        iconColor: changeIconColor ? getColor('supportSuccess') : undefined,
        divider: showDivider,
      },
    ];
  }

  private get many(): MenuItemProps[] {
    const { showIcons, changeIconColor, showDivider } = this.state;

    const getItem = (num: number): MenuItemProps => {
      return {
        text: `Item ${num}`,
        onPress: () => this.alert(`Item ${num} pressed`),
        onLongPress: () => this.alert(`Item ${num}1 long pressed`),
        icon: showIcons ? CodeIcon : undefined,
        iconColor: changeIconColor ? getColor('supportSuccess') : undefined,
        divider: showDivider,
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

  render() {
    const { showIcons, changeIconColor, showDivider } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={showIcons} id="showIcons" onPress={(value) => this.setState({ showIcons: value })} label="Show icons" />
        <Checkbox checked={changeIconColor} id="changeIconColor" onPress={(value) => this.setState({ changeIconColor: value })} label="Render icon in custom color" />
        <Checkbox checked={showDivider} id="showDivider" onPress={(value) => this.setState({ showDivider: value })} label="Show Divider" />
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
