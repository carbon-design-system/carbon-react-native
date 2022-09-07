import React from 'react';
import { StyleSheet, ScrollView, View, Alert, Dimensions } from 'react-native';
import { Button, Checkbox, Text, Tooltip, getColor, useDarkMode } from 'carbon-react-native';
import HelpIcon from '@carbon/icons/es/help/20';

export default class TestTooltip extends React.Component {
  state = {
    showWithActions: true,
  };

  private get styles() {
    return StyleSheet.create({
      view: {
        padding: 16,
        paddingTop: 8,
        flex: 1,
      },
      container: {
        flexGrow: 1,
        paddingBottom: 64,
      },
      itemStyle: {
        marginBottom: 20,
      },
      buttonAreaItem: {
        flex: 1,
      },
      contentText: {
        color: getColor('textInverse'),
        marginBottom: 18,
      },
      buttonArea: {
        flexDirection: 'row',
      },
      buttonFlex: {
        alignSelf: 'flex-start',
      },
      contentStyle: {
        maxWidth: Dimensions.get('window').width - 30,
      },
    });
  }

  private get contentOne(): React.ReactNode {
    return (
      <View>
        <Text style={this.styles.contentText} text="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua." />
      </View>
    );
  }

  private get contentTwo(): React.ReactNode {
    return (
      <View>
        <Text style={this.styles.contentText} text="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua." />
        <View style={this.styles.buttonArea}>
          <Button style={this.styles.buttonAreaItem} onPress={() => Alert.alert('Pressed learn more', 'This could open web browser. But did not close the tooltip')} kind="ghost" overrideColor={getColor('linkPrimary', useDarkMode() ? 'light' : 'dark')} text="Learn more" />
        </View>
      </View>
    );
  }

  render(): React.ReactNode {
    const { showWithActions } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={this.styles.container} style={this.styles.view}>
        <Checkbox checked={showWithActions} id="showWithActions" onPress={(value) => this.setState({ showWithActions: value })} label="Show tooltip with actions" />
        <View style={this.styles.itemStyle}>
          <Tooltip height={showWithActions ? undefined : 140} content={showWithActions ? this.contentTwo : this.contentOne} buttonProps={{ icon: HelpIcon, iconOnlyMode: true, text: 'Help', kind: 'ghost' }} />
        </View>
        <View style={this.styles.itemStyle}>
          <Tooltip height={showWithActions ? undefined : 140} content={showWithActions ? this.contentTwo : this.contentOne} caretPosition="center" buttonProps={{ text: 'Help', kind: 'tertiary' }} />
        </View>
        <View style={this.styles.itemStyle}>
          <Tooltip height={showWithActions ? undefined : 140} content={showWithActions ? this.contentTwo : this.contentOne} contentStyle={this.styles.contentStyle} caretPosition="right" buttonProps={{ icon: HelpIcon, text: 'Help', kind: 'primary' }} />
        </View>
        <View style={this.styles.itemStyle}>
          <Tooltip height={showWithActions ? undefined : 140} content={showWithActions ? this.contentTwo : this.contentOne} buttonProps={{ icon: HelpIcon, text: 'Help', kind: 'primary', style: this.styles.buttonFlex }} />
        </View>
        <View style={this.styles.itemStyle}>
          <Tooltip height={showWithActions ? undefined : 140} content={showWithActions ? this.contentTwo : this.contentOne} linkProps={{ rightIcon: HelpIcon, text: 'Help' }} />
        </View>
        <View style={this.styles.itemStyle}>
          <Tooltip height={showWithActions ? undefined : 140} content={showWithActions ? this.contentTwo : this.contentOne} linkProps={{ text: 'Help' }} />
        </View>
      </ScrollView>
    );
  }
}
