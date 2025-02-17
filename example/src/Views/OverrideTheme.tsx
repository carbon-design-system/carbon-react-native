import React from 'react';
import * as g10 from '@carbon/themes/src/g10.js';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Button, overrideDarkTheme, overrideLightTheme, ThemeDefinition, componentsG10, overrideFonts, FontWeights, RegularFont } from '@carbon/react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  baseSpacing: {
    marginTop: 20,
    fontFamily: '',
  },
});

export default class TestOverrideTheme extends React.Component<{ reloadView: () => void }> {
  private randomTheme = (): void => {
    const { reloadView } = this.props;

    const newTheme: ThemeDefinition = {};
    const componentKeys = [...Object.keys(componentsG10), ...Object.keys(g10)];

    componentKeys.forEach((key) => {
      const testString = Math.floor(Math.random() * 16777215).toString(16);
      newTheme[key] = `#${testString.length === 6 ? testString : '123abc'}`;
    });

    overrideDarkTheme(newTheme);
    overrideLightTheme(newTheme);

    reloadView();
  };

  private get fontList(): string[] {
    const iosList = ['Times New Roman', 'Papyrus', 'Menlo', 'Helvetica', 'Chalkboard S', 'San Francisco'];
    const androidList = ['normal', 'notoserif', 'sans-serif', 'Roboto', 'monospace', 'sans-serif-condensed'];

    return Platform.OS === 'ios' ? iosList : androidList;
  }

  private randomFont = (): void => {
    const { reloadView } = this.props;

    const fontFamily = this.fontList[Math.floor(Math.random() * (this.fontList.length - 1))];

    if (fontFamily) {
      overrideFonts({
        light: {
          fontWeight: '300' as FontWeights,
          fontFamily,
        },
        regular: {
          fontWeight: '400' as FontWeights,
          fontFamily,
        },
        semiBold: {
          fontWeight: '600' as FontWeights,
          fontFamily,
        },
        monoRegular: {
          fontWeight: '400' as FontWeights,
          fontFamily,
        },
      });

      reloadView();
    }
  };

  private resetTheme = (): void => {
    const { reloadView } = this.props;

    overrideDarkTheme({});
    overrideLightTheme({});
    overrideFonts({});

    reloadView();
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={styles.baseSpacing} text="Override theme using options below. Theme will be set to this until you kill the app or reset." />
        <Button style={styles.baseSpacing} text="Set random color theme" onPress={this.randomTheme} />
        <Button style={styles.baseSpacing} text="Set random font" onPress={this.randomFont} />
        <Text style={styles.baseSpacing} text={`Current font: ${RegularFont().fontFamily}`} />
        <Button style={styles.baseSpacing} text="Reset theme" onPress={this.resetTheme} />
      </ScrollView>
    );
  }
}
