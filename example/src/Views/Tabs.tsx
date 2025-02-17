import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Checkbox, Tabs, TabItem, Button } from '@carbon/react-native';

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
    marginBottom: 48,
  },
});

export default class TestTabs extends React.Component {
  state = {
    currentIndexA: undefined as number | undefined,
    currentIndexB: undefined as number | undefined,
    currentIndexC: undefined as number | undefined,
    disableSecond: false,
  };
  private onChange = (index: number, item: TabItem): void => {
    console.log(`Pressed to tab to ${item.text}`);
    this.setState({ [item.data as string]: index });
  };

  private get twoOptions(): TabItem[] {
    const { disableSecond } = this.state;

    return [
      {
        text: 'Item 1',
        data: 'currentIndexA',
      },
      {
        text: 'Item 2',
        data: 'currentIndexA',
        disabled: disableSecond,
      },
    ];
  }

  private get manyOptions(): TabItem[] {
    const { disableSecond } = this.state;

    return [
      {
        text: 'Item 1',
        data: 'currentIndexB',
      },
      {
        text: 'Item 2',
        data: 'currentIndexB',
        disabled: disableSecond,
      },
      {
        text: 'Item 3',
        data: 'currentIndexB',
      },
      {
        text: 'Item 4',
        data: 'currentIndexB',
      },
      {
        text: 'Item 5',
        data: 'currentIndexB',
      },
      {
        text: 'Item 6',
        data: 'currentIndexB',
      },
    ];
  }

  private get longTextOptions(): TabItem[] {
    const { disableSecond } = this.state;

    return [
      {
        text: 'Item 1',
        data: 'currentIndexC',
      },
      {
        text: 'Item 2 with really long text that will go into ellipsis instead of wrapping like the one below',
        data: 'currentIndexC',
        disabled: disableSecond,
      },
      {
        text: 'Item 3 with really long text that will wrap and be kind of odd on the screen',
        data: 'currentIndexC',
      },
    ];
  }

  render() {
    const { disableSecond, currentIndexA, currentIndexB, currentIndexC } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={disableSecond} id="subtext" onPress={(value) => this.setState({ disableSecond: value })} label="Make second one disabled" />
        <Button
          style={styles.itemStyle}
          onPress={() => {
            this.setState({
              currentIndexA: 1,
              currentIndexB: 1,
              currentIndexC: 1,
            });
          }}
          text="Make second one active for all"
        />
        <View style={styles.itemStyle}>
          <Tabs items={this.twoOptions} onChange={this.onChange} selectedIndex={currentIndexA} />
        </View>
        <View style={styles.itemStyle}>
          <Tabs items={this.manyOptions} scrollMode={true} onChange={this.onChange} selectedIndex={currentIndexB} />
        </View>
        <View style={styles.itemStyle}>
          <Tabs items={this.longTextOptions} onChange={this.onChange} selectedIndex={currentIndexC} />
        </View>
      </ScrollView>
    );
  }
}
