import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView, View, GestureResponderEvent, Pressable } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { defaultText } from '../../constants/defaultText';

export type TileProps = {
  /** Type of tile */
  type?: 'default'|'scroll'|'clickable';
  /** onPress event for clickable tile */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event for clickable tile */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Text to use for tile clickable (accessibility). Defaults to ENGLISH "Tile" */
  tileText?: string;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
  /** Children to render */
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 64,
    minWidth: 128,
    backgroundColor: getColor('layer01'),
    padding: 16,
  },
  scrollContent: {
    padding: 16,
  },
});

export class Tile extends React.Component<TileProps> {
  render(): React.ReactNode {
    const {children, componentProps, style, type, onPress, onLongPress, tileText} = this.props;
    const finalStyles = styleReferenceBreaker(styles.wrapper, style);

    switch (type) {
      case 'scroll':
        finalStyles.padding = undefined;
        return <ScrollView bounces={false} style={finalStyles} contentContainerStyle={styles.scrollContent} {...(componentProps || {})}>{children}</ScrollView>;
      case 'clickable':
        return <Pressable onPress={onPress} onLongPress={onLongPress} accessibilityRole="button" accessibilityLabel={tileText || defaultText.tile} style={finalStyles} {...(componentProps || {})}>{children}</Pressable>;
      case 'default':
      default:
        return <View style={finalStyles} {...(componentProps || {})}>{children}</View>;
    }
  }
}
