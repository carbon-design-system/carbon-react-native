import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { getColor } from '../../styles/colors';
import {Text} from '../Text';

export type ButtonProps = {
  /** Text to render */
  text?: string;
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
  /** Style to set on the text */
  style?: StyleProp<TextStyle>;
  /** Direct props to set on the React Text component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
}

export class Button extends React.Component<ButtonProps> {
  private basicButton: StyleProp<ViewStyle> = {
    padding: 16,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 32,
  };

  private get buttonStyle(): StyleProp<ViewStyle> {
    const {kind, style, disabled} = this.props;
    let finalStyle: any = {};

    switch (kind) {
      case 'secondary':
        finalStyle = Object.assign({}, {
          backgroundColor: getColor(disabled ? 'buttonDisabled' : 'buttonSecondary'),
        }, this.basicButton);
        break;
      case 'tertiary':
        finalStyle = Object.assign({}, {
          backgroundColor: 'transparent',
          borderColor: getColor(disabled ? 'buttonDisabled' : 'buttonPrimary'),
          borderWidth: 1,
        }, this.basicButton);
        break;
      case 'danger':
        finalStyle = Object.assign({}, {
          backgroundColor: getColor(disabled ? 'buttonDisabled' : 'buttonDangerPrimary'),
        }, this.basicButton);
        break;
      case 'ghost':
        finalStyle = Object.assign({}, {
          backgroundColor: 'transparent',
        }, this.basicButton);
        break;
      case 'primary':
        default:
          finalStyle = Object.assign({}, {
            backgroundColor: getColor(disabled ? 'buttonDisabled' : 'buttonPrimary')
          }, this.basicButton);
          break;
    }

    return StyleSheet.create(Object.assign(finalStyle, style));
  }

  private get textStyle(): StyleProp<TextStyle> {
    const {kind, disabled} = this.props;
    let finalStyle: any = {};

    switch (kind) {
      case 'tertiary':
      case 'ghost':
        finalStyle = Object.assign({}, {
          color: getColor(disabled ? 'textOnColorDisabled' : 'textOnColor'),
          textAlign: 'left',
        });
        break;
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        finalStyle = Object.assign({}, {
          color: getColor(disabled ? 'textDisabled' : 'buttonTertiary'),
          textAlign: 'left',
        });
        break;
    }

    return StyleSheet.create(Object.assign(finalStyle));
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
    const {text, disabled, onLongPress, componentProps} = this.props;

    return (
      <Pressable disabled={disabled} style={this.buttonStyle} accessibilityLabel={text} accessibilityRole="button" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
        <Text type="body-compact-02" style={this.textStyle} text={text} breakMode="tail" />
      </Pressable>
    );
  }
}
