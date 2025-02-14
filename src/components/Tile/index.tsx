import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView, View, GestureResponderEvent, Pressable, PressableStateCallbackType } from 'react-native';
import { getColor } from '../../styles/colors';
import { pressableFeedbackStyle } from '../../helpers';
import { defaultText } from '../../constants/defaultText';

/** Props for Tile component */
export type TileProps = {
  /** Type of tile */
  type?: 'default' | 'scroll' | 'clickable';
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
};

/**
 * Tile component for rendering a carbon tile
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Tile.tsx | Example code}
 */
export class Tile extends React.Component<TileProps> {
  private get styles() {
    return StyleSheet.create({
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
  }

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  render(): React.ReactNode {
    const { children, componentProps, style, type, onPress, onLongPress, tileText } = this.props;
    const finalStyles = StyleSheet.flatten([this.styles.wrapper, style]);

    switch (type) {
      case 'scroll':
        finalStyles.padding = undefined;
        return (
          <ScrollView bounces={false} style={finalStyles} contentContainerStyle={this.styles.scrollContent} {...(componentProps || {})}>
            {children}
          </ScrollView>
        );
      case 'clickable':
        return (
          <Pressable onPress={onPress} onLongPress={onLongPress} accessibilityRole="button" accessibilityLabel={tileText || defaultText.tile} style={(state) => pressableFeedbackStyle(state, finalStyles, this.getStateStyle)} {...(componentProps || {})}>
            {children}
          </Pressable>
        );
      case 'default':
      default:
        return (
          <View style={finalStyles} {...(componentProps || {})}>
            {children}
          </View>
        );
    }
  }
}
