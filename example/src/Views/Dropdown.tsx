import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Dropdown, DropdownItem } from 'carbon-react-native';

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
    marginBottom: 24,
  },
});

export default class TestDropdown extends React.Component {
  state = {
    value1: 'Item 1',
    value2: 'Item 2',
    value3: 'Item 3',
    value4: 'Item 4',
    value5: 'Item 5',
    value6: 'Can not change me',
  };

  private changeText = (field: string, value: DropdownItem): void => {
    this.setState({ [field]: value.text });
  };

  private get items(): DropdownItem[] {
    return [
      {
        id: '1',
        text: 'Item 1',
      },
      {
        id: '2',
        text: 'Item 2',
      },
      {
        id: '3',
        text: 'Item 3',
      },
      {
        id: '4',
        text: 'Item 4',
      },
      {
        text: 'Item 5',
      },
      {
        id: '6',
        text: 'Item 6',
        disabled: true,
      },
      {
        id: '67',
        text: 'Item 7',
      },
    ];
  }

  render(): React.ReactNode {
    const { value1, value2, value3, value4, value5, value6 } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <Dropdown items={this.items} label="Text box" value={value1} helperText="I am helper text" onChange={(value) => this.changeText('value1', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Dropdown items={this.items} label="Text box with really long label that is probably going to wrap on most screens" value={value2} onChange={(value) => this.changeText('value2', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Dropdown items={this.items} label="I should have placeholder text" value={value3} onChange={(value) => this.changeText('value3', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Dropdown items={this.items} label="I should have everything" value={value4} helperText="I am helper text that is really long explaining how this input should work and stuff. I also override and set 220 px height" onChange={(value) => this.changeText('value4', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Dropdown items={this.items} label="I am required" value={value5} onChange={(value) => this.changeText('value5', value)} />
        </View>
        <View style={styles.itemStyle}>
          <Dropdown items={this.items} label="I am disabled" disabled={true} value={value6} onChange={(value) => this.changeText('value6', value)} />
        </View>
      </ScrollView>
    );
  }
}
