import React from 'react';
import { ViewProps, StyleProp, ViewStyle, AccessibilityRole } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SafeAreaWrapperProps = {
  style?: StyleProp<ViewStyle>;
  accessibilityRole?: AccessibilityRole;
  children?: React.ReactNode;
}

export class SafeAreaWrapper extends React.Component<SafeAreaWrapperProps|ViewProps> {
  render() {
    return <SafeAreaView {...this.props} />;
  }
}
