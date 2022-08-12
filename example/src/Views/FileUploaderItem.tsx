import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { FileUploaderItem, Text } from 'carbon-react-native';

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

export default class TestFileUploaderItem extends React.Component {
  state = {
    deletedItem: false,
    deletedItem2: false,
  };

  render(): React.ReactNode {
    const {deletedItem, deletedItem2} = this.state;
    const itemStyle = {marginBottom: 16};

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="File uploader item" />
        <View style={itemStyle}><FileUploaderItem name="Filename.jpg" /></View>
        {!deletedItem && <View style={itemStyle}><FileUploaderItem name="Filename.jpg" onDelete={() => this.setState({deletedItem: true})} /></View>}
        <View style={itemStyle}><FileUploaderItem name="Filename.jpg" status="complete" /></View>
        {!deletedItem2 && <View style={itemStyle}><FileUploaderItem name="Filename-asdasdasd-asdasdasd-asdasdasd-sadasdasdas-asdasdasdasds-asd.jpg" invalid={true} onDelete={() => this.setState({deletedItem2: true})} /></View>}
        <View style={itemStyle}><FileUploaderItem name="Filename-asdasdasd-asdasdasd-asdasdasd-sadasdasdas-asdasdasdasds-asd.jpg" status="complete" /></View>
        <View style={itemStyle}><FileUploaderItem name="Filename.jpg" status="uploading" /></View>
        <View style={itemStyle}><FileUploaderItem name="Filename.jpg" invalid={true} status="uploading" errorTitle="File exceeds allowed size" /></View>
        <View style={itemStyle}><FileUploaderItem name="Filename.jpg" invalid={true} status="uploading" errorTitle="File exceeds allowed size" errorDetails="This file was too large so you cannot upload it. Try making it smaller. But this is text is just long to make it wrap." /></View>
      </ScrollView>
    );
  }
}
