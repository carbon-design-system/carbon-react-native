import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Checkbox, ContentSwitcher, SwitcherItem, Button } from 'carbon-react-native';

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

export default class TestContentSwitcher extends React.Component {
  state = {
    currentIndexA: undefined as number | undefined,
    currentIndexB: undefined as number | undefined,
    currentIndexC: undefined as number | undefined,
    disableSecond: false,
  };
  private onChange = (index: number, item: SwitcherItem): void => {
    console.log(`Pressed to switch to ${item.text}`);
    this.setState({ [item.data as string]: index });
  };

  private get twoOptions(): SwitcherItem[] {
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

  private get threeOptions(): SwitcherItem[] {
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
    ];
  }

  private get longTextOptions(): SwitcherItem[] {
    const { disableSecond } = this.state;

    return [
      {
        text: 'Item 1',
        data: 'currentIndexC',
      },
      {
        text: 'Item 2 with really long text that will go into ellipsis instead of wrapping like the one below',
        textBreakMode: 'tail',
        data: 'currentIndexC',
        disabled: disableSecond,
      },
      {
        text: 'Item 3 with really long text that will wrap and be kind of odd on the screen',
        data: 'currentIndexC',
      },
    ];
  }

  render(): React.ReactNode {
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
          <ContentSwitcher items={this.twoOptions} onChange={this.onChange} selectedIndex={currentIndexA} />
        </View>
        <View style={styles.itemStyle}>
          <ContentSwitcher items={this.threeOptions} onChange={this.onChange} selectedIndex={currentIndexB} />
        </View>
        <View style={styles.itemStyle}>
          <ContentSwitcher items={this.longTextOptions} onChange={this.onChange} selectedIndex={currentIndexC} />
        </View>
      </ScrollView>
    );
  }
}
