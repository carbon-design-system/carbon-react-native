import React from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { getColor } from '../../styles/colors';

/** Props for Overlay component */
export type OverlayProps = {
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * Overlay component for rendering overlay under floating items or menus
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Overlay.tsx | Example code}
 */
export class Overlay extends React.Component<OverlayProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        backgroundColor: getColor('overlay'),
        width: '100%',
        height: '100%',
      },
    });
  }

  render(): React.ReactNode {
    const { componentProps, style } = this.props;

    return <View style={[this.styles.wrapper, style]} {...(componentProps || {})} />;
  }
}
