import React from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';

export type OverlayProps = {
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
}

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
    const {componentProps, style} = this.props;

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} {...(componentProps || {})} />
    );
  }
}
