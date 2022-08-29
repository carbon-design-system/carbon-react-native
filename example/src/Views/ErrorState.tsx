import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Checkbox, RadioButton, getColor, ErrorStateTypes, ErrorState, Text } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  radioWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButton: {
    marginRight: 16,
  },
  appBreaker: {
    backgroundColor: getColor('tagBackgroundMagenta'),
    height: 20,
  },
});

export default class TestErrorState extends React.Component {
  state = {
    type: 'generic' as ErrorStateTypes,
    hasSubtitle: true,
    hasErrorCode: false,
    noImage: false,
  };

  render(): React.ReactNode {
    const { hasSubtitle, type, hasErrorCode, noImage } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text text="Type" type="label-02" />
        <View style={styles.radioWrapper}>
          <RadioButton style={styles.radioButton} checked={type === 'generic'} id="generic" label="Generic" onPress={() => this.setState({ type: 'generic' })} />
          <RadioButton style={styles.radioButton} checked={type === 'access'} id="access" label="Access" onPress={() => this.setState({ type: 'access' })} />
          <RadioButton style={styles.radioButton} checked={type === 'empty'} id="empty" label="Empty" onPress={() => this.setState({ type: 'empty' })} />
        </View>
        <Checkbox checked={hasSubtitle} id="hasSubtitle" onPress={(value) => this.setState({ hasSubtitle: value })} label="Show sub title" />
        <Checkbox checked={hasErrorCode} id="hasErrorCode" onPress={(value) => this.setState({ hasErrorCode: value })} label="Show error code" />
        <Checkbox checked={noImage} id="noImage" onPress={(value) => this.setState({ noImage: value })} label="No image" />
        <ErrorState type={type} title="Unable to load" noImage={noImage} subTitle={hasSubtitle ? 'This is the test page for the error. There is not really an error. This is just testing that view.' : undefined} errorCode={hasErrorCode ? 'Fault: 0x01221511' : undefined} />
      </ScrollView>
    );
  }
}
