import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Checkbox, getColor, RadioButton, Text, ViewWrapper } from '@carbon/react-native';

export default class TestViewWrapper extends React.Component<{
  goHome: () => void;
}> {
  state = {
    topNavColor: false,
    topCustomColor: false,
    bottomNavColor: false,
    bottomCustomColor: false,
    statusBar: 'unset',
  };

  private get styles() {
    return StyleSheet.create({
      scrollView: {
        padding: 16,
        flex: 1,
      },
      scrollContainer: {
        flexGrow: 1,
        paddingBottom: 64,
      },
      buttonStyle: {
        marginTop: 32,
      },
      section: {
        marginTop: 24,
      },
    });
  }

  render(): React.ReactNode {
    const { topNavColor, topCustomColor, bottomNavColor, bottomCustomColor, statusBar } = this.state;
    const { goHome } = this.props;
    let statusBarType = undefined as 'dark-content' | 'light-content' | undefined;

    if (statusBar === 'dark') {
      statusBarType = 'dark-content';
    } else if (statusBar === 'light') {
      statusBarType = 'light-content';
    }

    return (
      <ViewWrapper hasTopNavigation={topNavColor} hasBottomNavigation={bottomNavColor} topBackgroundColor={topCustomColor ? getColor('supportWarningInverse') : undefined} bottomBackgroundColor={bottomCustomColor ? getColor('supportErrorInverse') : undefined} statusBarStyle={statusBarType}>
        <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={this.styles.scrollContainer} style={this.styles.scrollView}>
          <Text type="heading-compact-02" text="View wrapper test" />
          <Checkbox checked={topNavColor} id="topNavColor" onPress={(value) => this.setState({ topNavColor: value })} label="Top color for navigation" />
          <Checkbox checked={topCustomColor} id="topCustomColor" onPress={(value) => this.setState({ topCustomColor: value })} label="Top color is custom" />
          <Checkbox checked={bottomNavColor} id="bottomNavColor" onPress={(value) => this.setState({ bottomNavColor: value })} label="Bottom color for navigation" />
          <Checkbox checked={bottomCustomColor} id="bottomCustomColor" onPress={(value) => this.setState({ bottomCustomColor: value })} label="Bottom color is custom" />
          <Text text="Status bar override" type="label-02" style={this.styles.section} />
          <RadioButton checked={statusBar === 'unset'} id="unset" label="Unset (default)" onPress={() => this.setState({ statusBar: 'unset' })} />
          <RadioButton checked={statusBar === 'dark'} id="dark" label="Dark content (on light background)" onPress={() => this.setState({ statusBar: 'dark' })} />
          <RadioButton checked={statusBar === 'light'} id="light" label="Light content (on dark background)" onPress={() => this.setState({ statusBar: 'light' })} />
          <Button style={this.styles.buttonStyle} onPress={goHome} text="Return to components" />
        </ScrollView>
      </ViewWrapper>
    );
  }
}
