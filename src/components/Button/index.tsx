import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

export type ButtonProps = {
  /** Text to render (for iconOnlyMode use descriptive text) */
  text: string;
  /** Icon to render (size 20) */
  icon?: unknown;
  /** Indicate if icon only mode should be used (text is not rendered) */
  iconOnlyMode?: boolean;
  /** Indicate if button is disabled */
  disabled?: boolean;
  /** Button kind. Primary is default */
  kind?: 'primary'|'secondary'|'tertiary'|'danger'|'ghost';
  /** onPress event */
  onPress: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Override text or icon color for edge cases */
  overrideColor?: string;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
}

const styles = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    top: 14,
    right: 16,
  },
});

export class Button extends React.Component<ButtonProps> {
  private basicButton: StyleProp<ViewStyle> = {
    padding: 16,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 32,
    minHeight: 48,
    width: '100%',
    position: 'relative',
  };

  private get buttonStyle(): StyleProp<ViewStyle> {
    const {kind, style, disabled, iconOnlyMode, icon} = this.props;
    let finalStyle: any = {};

    switch (kind) {
      case 'secondary':
        finalStyle = styleReferenceBreaker({
          backgroundColor: getColor(disabled ? 'buttonDisabled' : 'buttonSecondary'),
        }, this.basicButton);
        break;
      case 'tertiary':
        finalStyle = styleReferenceBreaker({
          backgroundColor: 'transparent',
          borderColor: getColor(disabled ? 'buttonDisabled' : 'buttonTertiary'),
          borderWidth: 1,
        }, this.basicButton);
        break;
      case 'danger':
        finalStyle = styleReferenceBreaker({
          backgroundColor: getColor(disabled ? 'buttonDisabled' : 'buttonDangerPrimary'),
        }, this.basicButton);
        break;
      case 'ghost':
        finalStyle = styleReferenceBreaker({
          backgroundColor: 'transparent',
        }, this.basicButton);
        break;
      case 'primary':
        default:
          finalStyle = styleReferenceBreaker({
            backgroundColor: getColor(disabled ? 'buttonDisabled' : 'buttonPrimary')
          }, this.basicButton);
          break;
    }

    if (icon && iconOnlyMode) {
      finalStyle.paddingRight = 16;
      finalStyle.paddingLeft = 16;
      finalStyle.maxWidth = 52;
    }

    return StyleSheet.create(Object.assign(finalStyle, style));
  }

  private get iconTextColor(): string {
    const {kind, disabled, overrideColor} = this.props;

    switch (kind) {
      case 'tertiary':
        return overrideColor || getColor(disabled ? 'textDisabled' : 'buttonTertiary');
      case 'ghost':
        return overrideColor || getColor(disabled ? 'textDisabled' : 'interactive');
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        return overrideColor || getColor(disabled ? 'textOnColorDisabled' : 'textOnColor');
    }
  }

  private get textStyle(): StyleProp<TextStyle> {
    const {kind} = this.props;
    let finalStyle: any = {};

    switch (kind) {
      case 'tertiary':
      case 'ghost':
        finalStyle = styleReferenceBreaker({
          color: this.iconTextColor,
          textAlign: 'left',
        });
        break;
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        finalStyle = styleReferenceBreaker({
          color: this.iconTextColor,
          textAlign: 'left',
        });
        break;
    }

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
    const {text, disabled, onLongPress, componentProps, icon, iconOnlyMode} = this.props;

    return (
      <Pressable disabled={disabled} style={this.buttonStyle} accessibilityLabel={text} accessibilityRole="button" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
        {!iconOnlyMode && <Text type="body-compact-02" style={this.textStyle} text={text} breakMode="tail" />}
        {icon && <View style={styles.iconStyle}>{createIcon(icon, 20, 20, this.iconTextColor)}</View>}
      </Pressable>
    );
  }
}
