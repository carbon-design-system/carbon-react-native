import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Checkbox, Notification, NotificationTypes, Link } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  linkAlign: {
    alignSelf: 'flex-start',
  },
  baseSpacing: {
    marginBottom: 16,
  },
});

export default class TestNotification extends React.Component {
  state = {
    showSubtitle: true,
    showAction: true,
    showDismiss: true,
    longTitle: false,
    longSubTitle: false,
    lowContrast: false,
    multiLine: false,
  };

  private onDismiss = (): void => {
    Alert.alert('Pressed dismiss', 'Normally you should remove it from DOM to respect user. But this is just for testing.');
  };

  private actionCallback = (): void => {
    Alert.alert('Pressed action');
  };

  render(): React.ReactNode {
    const { showSubtitle, showAction, showDismiss, lowContrast, multiLine, longTitle, longSubTitle } = this.state;
    const types: NotificationTypes[] = ['info', 'error', 'warning', 'success'];

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={showSubtitle} id="subtext" onPress={(value) => this.setState({ showSubtitle: value })} label="Show sub title" />
        <Checkbox checked={showAction} id="action" onPress={(value) => this.setState({ showAction: value })} label="Show action" />
        <Checkbox checked={showDismiss} id="dismiss" onPress={(value) => this.setState({ showDismiss: value })} label="Show dismiss" />
        <Checkbox checked={lowContrast} id="low" onPress={(value) => this.setState({ lowContrast: value })} label="Use low contrast" />
        <Checkbox checked={multiLine} id="multi" onPress={(value) => this.setState({ multiLine: value })} label="Multi line mode" />
        <Checkbox checked={longTitle} id="long-title" onPress={(value) => this.setState({ longTitle: value })} label="Very long title" />
        <Checkbox checked={longSubTitle} id="long-sub" onPress={(value) => this.setState({ longSubTitle: value })} label="Very long sub title" />
        {types.map((type) => {
          return <Notification style={styles.baseSpacing} key={type} kind={type} multiLine={multiLine} lowContrast={lowContrast} actionArea={showAction ? <Link style={styles.linkAlign} onPress={this.actionCallback} text="Action" /> : undefined} title={longTitle ? 'Awesome notification with a crazy long title that is really weird just to be long' : 'Awesome notification'} subTitle={showSubtitle ? (longSubTitle ? 'Useful subtitle information about this notification with even longer info that will be useful for testing extreme edge cases.' : 'Useful subtitle information about this notification') : undefined} onDismiss={showDismiss ? this.onDismiss : undefined} />;
        })}
      </ScrollView>
    );
  }
}
