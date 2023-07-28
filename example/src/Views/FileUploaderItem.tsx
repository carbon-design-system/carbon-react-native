import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { FileUploaderItem } from '@carbon/react-native';

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

export default class TestFileUploaderItem extends React.Component {
  state = {
    deletedItem: false,
    deletedItem2: false,
  };

  render(): React.ReactNode {
    const { deletedItem, deletedItem2 } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <View style={styles.itemStyle}>
          <FileUploaderItem name="Filename.jpg" />
        </View>
        {!deletedItem && (
          <View style={styles.itemStyle}>
            <FileUploaderItem name="Filename.jpg" onDelete={() => this.setState({ deletedItem: true })} />
          </View>
        )}
        <View style={styles.itemStyle}>
          <FileUploaderItem name="Filename.jpg" status="complete" />
        </View>
        {!deletedItem2 && (
          <View style={styles.itemStyle}>
            <FileUploaderItem name="Filename-asdasdasd-asdasdasd-asdasdasd-sadasdasdas-asdasdasdasds-asd.jpg" invalid={true} onDelete={() => this.setState({ deletedItem2: true })} />
          </View>
        )}
        <View style={styles.itemStyle}>
          <FileUploaderItem name="Filename-asdasdasd-asdasdasd-asdasdasd-sadasdasdas-asdasdasdasds-asd.jpg" status="complete" />
        </View>
        <View style={styles.itemStyle}>
          <FileUploaderItem name="Filename.jpg" status="uploading" />
        </View>
        <View style={styles.itemStyle}>
          <FileUploaderItem name="Filename.jpg" invalid={true} status="uploading" errorTitle="File exceeds allowed size" />
        </View>
        <View style={styles.itemStyle}>
          <FileUploaderItem name="Filename.jpg" invalid={true} status="uploading" errorTitle="File exceeds allowed size" errorDetails="This file was too large so you cannot upload it. Try making it smaller. But this is text is just long to make it wrap." />
        </View>
      </ScrollView>
    );
  }
}
