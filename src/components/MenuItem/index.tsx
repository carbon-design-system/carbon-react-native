import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text, TextBreakModes, TextTypes } from '../Text';

export type MenuItemProps = {
  /** Text to render */
  text: string;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Text type to render (Standard is default.  Normally only body 01 or 02 should be used)  */
  textType?: TextTypes;
  /** onPress event */
  onPress: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
};

export class MenuItem extends React.Component<MenuItemProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        marginRight: 16,
        marginLeft: 16,
        paddingTop: 13,
        paddingBottom: 13,
      },
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { disabled } = this.props;

    let finalStyle: any = {
      color: getColor(disabled ? 'textDisabled' : 'textSecondary'),
    };

    return StyleSheet.create(finalStyle);
  }

  private onPress = (event: GestureResponderEvent): void => {
    const { dismissKeyboardOnPress, onPress } = this.props;

    if (dismissKeyboardOnPress && typeof Keyboard?.dismiss === 'function') {
      Keyboard.dismiss();
    }

    if (typeof onPress === 'function') {
      onPress(event);
    }
  };

  render(): React.ReactNode {
    const { text, disabled, onLongPress, componentProps, textType, style, textBreakMode } = this.props;

    return (
      <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, styleReferenceBreaker(this.styles.wrapper, style))} accessibilityLabel={text} accessibilityRole="menuitem" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
        <Text breakMode={textBreakMode} type={textType} style={this.textStyle} text={text} />
      </Pressable>
    );
  }
}
