import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle, PressableStateCallbackType, View } from 'react-native';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text, TextBreakModes, TextTypes } from '../Text';
import { CarbonIcon } from '../../types/shared';

/** Props for MenuItem component */
export type MenuItemProps = {
  /** Text to render */
  text: string;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Text type to render (Standard is default.  Normally only body 01 or 02 should be used)  */
  textType?: TextTypes;
  /** Set to an icon from Carbon (size 20). */
  icon?: CarbonIcon;
  /** Color of the icon (default is primary text) */
  iconColor?: string;
  /** Indicate that divider should be rendered (does not apply to last item) */
  divider?: boolean;
  /** Indicates that menu item is final item (this is used internally) */
  lastItem?: boolean;
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

/**
 * MenuItem component for rendering an item to live in a menu or similar styled items
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Menu.tsx | Example code}
 */
export class MenuItem extends React.Component<MenuItemProps> {
  private get styles() {
    const { divider, lastItem } = this.props;

    return StyleSheet.create({
      wrapper: {
        padding: 14,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: divider && !lastItem ? getColor('borderSubtle00') : undefined,
        borderBottomWidth: divider && !lastItem ? 1 : undefined,
      },
      icon: {
        paddingTop: 2,
        paddingRight: 14,
      },
    });
  }

  private get textColor(): string {
    const { disabled } = this.props;

    return getColor(disabled ? 'textDisabled' : 'textSecondary');
  }

  private get iconColor(): string {
    const { iconColor, disabled } = this.props;

    if (disabled) {
      return this.textColor;
    }

    return iconColor || this.textColor;
  }

  private get textStyle(): StyleProp<TextStyle> {
    let finalStyle: any = {
      color: this.textColor,
      flex: 1,
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

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  render(): React.ReactNode {
    const { text, disabled, onLongPress, componentProps, textType, style, textBreakMode, icon } = this.props;

    return (
      <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, styleReferenceBreaker(this.styles.wrapper, style), this.getStateStyle)} accessibilityLabel={text} accessibilityRole="menuitem" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
        {!!icon && <View style={this.styles.icon}>{createIcon(icon, 20, 20, this.iconColor)}</View>}
        <Text breakMode={textBreakMode} type={textType} style={this.textStyle} text={text} />
      </Pressable>
    );
  }
}
