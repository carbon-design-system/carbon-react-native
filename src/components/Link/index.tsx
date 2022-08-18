import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import type { CarbonIcon } from '../../types/shared';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text, TextBreakModes, TextTypes } from '../Text';

export type LinkProps = {
  /** Text to render */
  text: string;
  /** Icon to load on the left of text (size 20) */
  leftIcon?: CarbonIcon;
  /** Icon to load on the right of text (size 20) */
  rightIcon?: CarbonIcon;
  /** Icon size (if different than 20) */
  iconSize?: number;
  /** Indicate if link is disabled */
  disabled?: boolean;
  /** Text type to render (Standard is default)  */
  textType?: TextTypes;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** onPress event */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Style to set on the text */
  textStyle?: StyleProp<TextStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
};

/**
 * To not have a link be pressable 100% of screen format parent or pass style appropriately.
 * alignSelf: 'flex-start' is useful for this
 */
export class Link extends React.Component<LinkProps> {
  private get textIconColor(): string {
    const { disabled } = this.props;

    return getColor(disabled ? 'textDisabled' : 'linkPrimary');
  }

  private get styles() {
    const { iconSize } = this.props;

    return StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      leftIcon: {
        marginRight: 4,
        height: iconSize || 20,
      },
      rightIcon: {
        marginLeft: 4,
        height: iconSize || 20,
      },
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { textStyle } = this.props;

    let finalStyle: any = {
      color: this.textIconColor,
    };

    return StyleSheet.create(styleReferenceBreaker(finalStyle, textStyle));
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
    const { text, disabled, onLongPress, componentProps, textType, style, textBreakMode, leftIcon, rightIcon, iconSize } = this.props;

    return (
      <Pressable disabled={disabled} style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityLabel={text} accessibilityRole="link" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
        {!!leftIcon && <View style={this.styles.leftIcon}>{createIcon(leftIcon, iconSize || 20, iconSize || 20, this.textIconColor)}</View>}
        <Text type={textType} style={this.textStyle} text={text} breakMode={textBreakMode} />
        {!!rightIcon && <View style={this.styles.rightIcon}>{createIcon(rightIcon, iconSize || 20, iconSize || 20, this.textIconColor)}</View>}
      </Pressable>
    );
  }
}
