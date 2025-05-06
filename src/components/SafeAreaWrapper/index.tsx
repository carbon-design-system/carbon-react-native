import React from 'react';
import { ViewProps, StyleProp, SafeAreaView, ViewStyle, Platform, AccessibilityRole } from 'react-native';
import { SafeAreaView as ContextSafeAreaView } from 'react-native-safe-area-context';

export type SafeAreaWrapperProps = {
  style?: StyleProp<ViewStyle>;
  accessibilityRole?: AccessibilityRole;
  children?: React.ReactNode;
}

export class SafeAreaWrapper extends React.Component<SafeAreaWrapperProps|ViewProps> {
  render() {
    return Platform.OS === 'ios' ? <SafeAreaView {...this.props} /> : <ContextSafeAreaView {...this.props} />;
  }
}
