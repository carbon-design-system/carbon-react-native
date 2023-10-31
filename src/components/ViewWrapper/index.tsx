import React from 'react';
import { ViewProps, StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import { getColor, useDarkMode } from '../../styles/colors';
import { BottomSafeAreaColorOverride } from '../BottomSafeAreaColorOverride';

/** Props for ViewWrapper component */
export type ViewWrapperProps = {
  /** Children to load */
  children?: React.ReactNode;
  /** Indicate if top navigation is in use (TopNavigationBar) */
  hasTopNavigation?: boolean;
  /** Indicate if bottom navigation is in use (BottomNavigationBar or any BottomToolbar) */
  hasBottomNavigation?: boolean;
  /** Override top background (for custom uses) */
  topBackgroundColor?: string;
  /** Override bottom background (for custom uses) */
  bottomBackgroundColor?: string;
  /** Override default status bar style (for dark backgrounds use 'light-content' and for light background use 'dark-content'). Will rely on useDarkMode otherwise */
  statusBarStyle?: 'light-content' | 'dark-content';
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * The ViewWrapper component provides a unified way to load main views without worrying about StatusBar or safe zone stylings.
 * For most usages simply indicate if you are using Navigation for top and bottom.
 * For Layout views that are full screen (Landing for example) you do not need to wrap them in this.
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/ViewWrapper.tsx | Example code}
 */
export class ViewWrapper extends React.Component<ViewWrapperProps> {
  private get topColor(): string {
    const { topBackgroundColor, hasTopNavigation } = this.props;

    if (topBackgroundColor) {
      return topBackgroundColor;
    } else if (hasTopNavigation) {
      return getColor('layer01');
    }

    return getColor('background');
  }

  private get bottomColor(): string {
    const { bottomBackgroundColor, hasBottomNavigation } = this.props;

    if (bottomBackgroundColor) {
      return bottomBackgroundColor;
    } else if (hasBottomNavigation) {
      return getColor('layer01');
    }

    return getColor('background');
  }

  private get needsBottomCover(): boolean {
    return this.topColor !== this.bottomColor;
  }

  private get styles() {
    return StyleSheet.create({
      wrapper: {
        backgroundColor: this.topColor,
        flexGrow: 1,
        position: 'relative',
      },
      safeWrapper: {
        flexGrow: 1,
      },
      childrenWrapper: {
        flexGrow: 1,
        backgroundColor: getColor('background'),
      },
    });
  }

  render(): React.ReactNode {
    const { children, componentProps, statusBarStyle } = this.props;

    return (
      <View style={this.styles.wrapper}>
        {this.needsBottomCover && <BottomSafeAreaColorOverride color={this.bottomColor} />}
        <SafeAreaView style={this.styles.safeWrapper} accessibilityRole="menu" {...(componentProps || {})}>
          <StatusBar backgroundColor={this.topColor} animated={true} barStyle={statusBarStyle || (useDarkMode() ? 'light-content' : 'dark-content')} />
          <View style={this.styles.childrenWrapper}>{children}</View>
        </SafeAreaView>
      </View>
    );
  }
}
