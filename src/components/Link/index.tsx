import React, { Ref } from 'react';
import { GestureResponderEvent, Keyboard, Platform, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import type { CarbonIcon } from '../../types/shared';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
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
  /** Indicate if back button usage should be used */
  backButtonMode?: boolean;
  /** onPress event */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Indicate if links are rendered on dark mode */
  forceDarkMode?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Style to set on the text */
  textStyle?: StyleProp<TextStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
  /** Ref property for parent */
  forwardRef?: Ref<View>;
};

/**
 * To not have a button be pressable 100% of screen format parent or pass style appropriately.
 * `alignSelf: 'flex-start'` is useful.
 */
export class Link extends React.Component<LinkProps> {
  private get textIconColor(): string {
    const { disabled, forceDarkMode } = this.props;

    return getColor(disabled ? 'textDisabled' : 'linkPrimary', forceDarkMode ? 'dark' : undefined);
  }

  private get styles() {
    const { iconSize } = this.props;

    return StyleSheet.create({
      wrapper: {
        paddingTop: 13,
        paddingBottom: 13,
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
      backArrowStyle: {
        paddingRight: 2,
        color: this.textIconColor,
      },
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { textStyle, disabled } = this.props;

    let finalStyle: any = {
      color: disabled ? getColor('textDisabled') : this.textIconColor,
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
    const { text, disabled, onLongPress, componentProps, textType, style, textBreakMode, leftIcon, rightIcon, iconSize, backButtonMode, forwardRef } = this.props;
    const androidBack = !!(backButtonMode && Platform.OS === 'android');

    return (
      <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, styleReferenceBreaker(this.styles.wrapper, style))} accessibilityLabel={text} accessibilityRole="link" onPress={this.onPress} onLongPress={onLongPress} ref={forwardRef} {...(componentProps || {})}>
        {!!(leftIcon && !backButtonMode) && <View style={this.styles.leftIcon}>{createIcon(leftIcon, iconSize || 20, iconSize || 20, this.textIconColor)}</View>}
        {backButtonMode && <Text type={textType} style={this.styles.backArrowStyle} text={'\u2190'} />}
        {!androidBack && <Text type={textType} style={this.textStyle} text={text} breakMode={textBreakMode} />}
        {!!rightIcon && <View style={this.styles.rightIcon}>{createIcon(rightIcon, iconSize || 20, iconSize || 20, this.textIconColor)}</View>}
      </Pressable>
    );
  }
}
