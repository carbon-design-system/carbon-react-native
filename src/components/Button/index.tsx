import React, { Ref } from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, PressableStateCallbackType, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import type { CarbonIcon } from '../../types/shared';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { ThemeChoices, getColor } from '../../styles/colors';
import { Text, TextBreakModes, TextTypes } from '../Text';

/** Props for Button component */
export type ButtonProps = {
  /** Text to render (for iconOnlyMode use descriptive text) */
  text: string;
  /** Icon to render (size 20) */
  icon?: CarbonIcon;
  /** Indicate if icon only mode should be used (text is not rendered) */
  iconOnlyMode?: boolean;
  /** Indicate if button is disabled */
  disabled?: boolean;
  /** Button kind. Primary is default */
  kind?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost' | 'danger-tertiary' | 'danger-ghost' | 'high-contrast' | 'high-contrast-inverse';
  /** Text type to render (Standard is default)  */
  textType?: TextTypes;
  /** onPress event */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Override text icon and border color for edge cases */
  overrideColor?: string;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
  /** Ref property for parent */
  forwardRef?: Ref<View>;
  /** Disable extra padding on right of buttons */
  disableDesignPadding?: boolean;
  /** Break mode used on string type content (default is tail) */
  breakMode?: TextBreakModes;
  /** Force theme color (useful for rendering on light items in other mode) */
  forceTheme?: ThemeChoices;
};

/**
 * Button component for rendering a button
 * To not have a button be pressable 100% of screen format parent or pass style appropriately. `alignSelf: 'flex-start'` is useful.
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Button.tsx | Example code}
 */
export class Button extends React.Component<ButtonProps> {
  private basicButton: StyleProp<ViewStyle> = {
    padding: 16,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 48,
    minHeight: 48,
    minWidth: 48,
  };

  private get styles() {
    return StyleSheet.create({
      iconStyle: {
        position: 'absolute',
        top: 14,
        bottom: 14,
        right: 14,
        justifyContent: 'center',
      },
    });
  }

  private getBackgroundColor(active?: boolean): string {
    const { kind, disabled, forceTheme } = this.props;

    switch (kind) {
      case 'secondary':
        return getColor(disabled ? 'buttonDisabled' : active ? 'buttonSecondaryActive' : 'buttonSecondary', forceTheme);
      case 'tertiary':
        return active ? getColor('buttonTertiaryActive', forceTheme) : 'transparent';
      case 'high-contrast':
        return active ? getColor('buttonHighContrastActive', forceTheme) : 'transparent';
      case 'high-contrast-inverse':
        return active ? getColor('buttonHighContrastInverseActive', forceTheme) : 'transparent';
      case 'danger':
        return getColor(disabled ? 'buttonDisabled' : active ? 'buttonDangerActive' : 'buttonDangerPrimary', forceTheme);
      case 'ghost':
        return active ? getColor('layerActive01', forceTheme) : 'transparent';
      case 'danger-ghost':
      case 'danger-tertiary':
        return active ? getColor('buttonDangerActive', forceTheme) : 'transparent';
      case 'primary':
      default:
        return getColor(disabled ? 'buttonDisabled' : active ? 'buttonPrimaryActive' : 'buttonPrimary', forceTheme);
    }
  }

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const { kind } = this.props;
    const keepBorder = ['high-contrast', 'high-contrast-inverse'].includes(kind as string);

    return state.pressed
      ? {
          backgroundColor: this.getBackgroundColor(true),
          borderWidth: keepBorder ? 1 : 0,
        }
      : undefined;
  };

  private get buttonStyle(): StyleProp<ViewStyle> {
    const { kind, style, disabled, iconOnlyMode, icon, overrideColor, disableDesignPadding, forceTheme } = this.props;
    let finalStyle: any = {};

    switch (kind) {
      case 'secondary':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
          },
          this.basicButton
        );
        break;
      case 'tertiary':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
            borderColor: getColor(disabled ? 'buttonDisabled' : 'buttonTertiary', forceTheme),
            borderWidth: 1,
          },
          this.basicButton
        );
        break;
      case 'high-contrast':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
            borderColor: getColor(disabled ? 'buttonDisabled' : 'buttonHighContrast', forceTheme),
            borderWidth: 1,
          },
          this.basicButton
        );
        break;
      case 'high-contrast-inverse':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
            borderColor: getColor(disabled ? 'buttonDisabled' : 'buttonHighContrastInverse', forceTheme),
            borderWidth: 1,
          },
          this.basicButton
        );
        break;
      case 'danger-tertiary':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
            borderColor: getColor(disabled ? 'buttonDisabled' : 'buttonDangerSecondary', forceTheme),
            borderWidth: 1,
          },
          this.basicButton
        );
        break;
      case 'danger':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
          },
          this.basicButton
        );
        break;
      case 'danger-ghost':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
          },
          this.basicButton
        );
        break;
      case 'ghost':
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
          },
          this.basicButton
        );
        break;
      case 'primary':
      default:
        finalStyle = styleReferenceBreaker(
          {
            backgroundColor: this.getBackgroundColor(),
          },
          this.basicButton
        );
        break;
    }

    if (icon && iconOnlyMode) {
      finalStyle.paddingRight = 16;
      finalStyle.paddingLeft = 16;
      finalStyle.maxWidth = 48;
    }

    if (disableDesignPadding) {
      finalStyle.paddingRight = 16;
    }

    if (overrideColor) {
      finalStyle.borderColor = overrideColor;
    }

    return StyleSheet.create(styleReferenceBreaker(finalStyle, style));
  }

  private get iconTextColor(): string {
    const { kind, disabled, overrideColor, forceTheme } = this.props;

    switch (kind) {
      case 'danger-ghost':
      case 'danger-tertiary':
        return overrideColor || getColor(disabled ? 'textDisabled' : 'buttonDangerSecondary', forceTheme);
      case 'tertiary':
        return overrideColor || getColor(disabled ? 'textDisabled' : 'buttonTertiary', forceTheme);
      case 'high-contrast':
        return overrideColor || getColor(disabled ? 'textDisabled' : 'buttonHighContrast', forceTheme);
      case 'high-contrast-inverse':
        return overrideColor || getColor(disabled ? 'textDisabled' : 'buttonHighContrastInverse', forceTheme);
      case 'ghost':
        return overrideColor || getColor(disabled ? 'textDisabled' : 'linkPrimary', forceTheme);
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        return overrideColor || getColor(disabled ? 'textOnColorDisabled' : 'textOnColor', forceTheme);
    }
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { kind } = this.props;
    let finalStyle: any = {};

    switch (kind) {
      case 'tertiary':
      case 'ghost':
      case 'high-contrast':
      case 'high-contrast-inverse':
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
    const { dismissKeyboardOnPress, onPress } = this.props;

    if (dismissKeyboardOnPress && typeof Keyboard?.dismiss === 'function') {
      Keyboard.dismiss();
    }

    if (typeof onPress === 'function') {
      onPress(event);
    }
  };

  render(): React.ReactNode {
    const { text, disabled, onLongPress, componentProps, icon, iconOnlyMode, textType, forwardRef, breakMode } = this.props;

    return (
      <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, this.buttonStyle, this.getStateStyle)} accessibilityLabel={text} accessibilityRole="button" onPress={this.onPress} onLongPress={onLongPress} ref={forwardRef} {...(componentProps || {})}>
        {!iconOnlyMode && <Text type={textType || 'body-compact-02'} style={this.textStyle} text={text} breakMode={breakMode || 'tail'} />}
        {!!icon && <View style={this.styles.iconStyle}>{createIcon(icon, 20, 20, this.iconTextColor)}</View>}
      </Pressable>
    );
  }
}
