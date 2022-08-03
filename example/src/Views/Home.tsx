import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'carbon-react-native'

interface TestHomeProps {
  changeView: (view: string) => void;
  componentViews: [string, React.ReactNode][];
  flowViews: [string, React.ReactNode][];
}

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

export default class TestHome extends React.Component<TestHomeProps> {
  private sortList = (itemA: [string, React.ReactNode], itemB: [string, React.ReactNode]): number => {
    const textA = (itemA[0] || '').toUpperCase();
    const textB = (itemB[0] || '').toUpperCase();

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

  render(): React.ReactNode {
    const {changeView, componentViews, flowViews} = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Components" />
        {componentViews.sort(this.sortList).map(view => <Button key={view[0]} style={{marginBottom: 8}} onPress={() => changeView(view[0])} text={view[0]} />)}
        <Text style={{marginBottom: 16, marginTop: 20}} type="heading-04" text="Flows" />
        {flowViews.sort(this.sortList).map(view => <Button key={view[0]} style={{marginBottom: 8}} onPress={() => changeView(view[0])} text={view[0]} />)}
      </ScrollView>
    );
  }
}
