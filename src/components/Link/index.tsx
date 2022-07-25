import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { getColor } from '../../styles/colors';
import { Text, TextTypes } from '../Text';

export type LinkProps = {
  /** Text to render */
  text: string;
  /** Indicate if link is disabled */
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
}

export class Link extends React.Component<LinkProps> {
  private get textStyle(): StyleProp<TextStyle> {
    const {disabled} = this.props;

    let finalStyle: any = {
      color: getColor(disabled ? 'textDisabled' : 'interactive'),
    };

    return StyleSheet.create(finalStyle);
  }

  private onPress = (event: GestureResponderEvent): void => {
    const {dismissKeyboardOnPress, onPress} = this.props;

    if (dismissKeyboardOnPress && typeof Keyboard?.dismiss === 'function') {
      Keyboard.dismiss();
    }

    if (typeof onPress === 'function') {
      onPress(event);
    }
  };

  render(): React.ReactNode {
    const {text, disabled, onLongPress, componentProps, textType, style} = this.props;

    return (
      <Pressable disabled={disabled} style={style} accessibilityLabel={text} accessibilityRole="link" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
        <Text type={textType} style={this.textStyle} text={text} />
      </Pressable>
    );
  }
}
