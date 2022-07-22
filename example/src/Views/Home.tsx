import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'carbon-react-native'

interface TestHomeProps {
  changeView: (view: string) => void;
  views: [string, React.ReactNode][];
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
  render(): React.ReactNode {
    const {changeView, views} = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Components" />
        {views.map(view => <Button key={view[0]} style={{marginBottom: 8}} onPress={() => changeView(view[0])} text={view[0]} />)}
      </ScrollView>
    );
  }
}
