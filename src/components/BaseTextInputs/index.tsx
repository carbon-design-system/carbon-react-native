import React from 'react';
import { PressableStateCallbackType, NativeSyntheticEvent, StyleProp, StyleSheet, TextInputFocusEventData, View, ViewStyle, TextInput as ReactTextInput, Pressable, Platform } from 'react-native';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Button } from '../Button';
import { Text } from '../Text';
import ViewIcon from '@carbon/icons/es/view/20';
import ViewOffIcon from '@carbon/icons/es/view--off/20';
import SubtractIcon from '@carbon/icons/es/subtract/20';
import CalendarIcon from '@carbon/icons/es/calendar/20';
import WarningIcon from '@carbon/icons/es/warning--alt--filled/20';
import ErrorIcon from '@carbon/icons/es/warning--filled/20';
import AddIcon from '@carbon/icons/es/add/20';
import { defaultText } from '../../constants/defaultText';
import { BodyCompact02, Body02 } from '../../styles/typography';
import { Link } from '../Link';
import { BaseTextInputTypes, TextInputProps } from '../../types/shared';

/** Props for the internal base text input */
type BaseTextInputProps = {
  /** Type of text input to render */
  type: BaseTextInputTypes;
  /** Callback for needed info for full bleed styling.  If set full bleed styling is used. */
  fullBleedCallback?: (focus: boolean, error: boolean) => void;
};

/**
 * Get the base styling for text inputs
 *
 * @param light - Indicate that light variant should be used
 * @param hasLabelLink - Indicates that item has label with link
 * @param fullBleed - Indicates that it should be full bleed style
 *
 * @returns React style item
 */
export const getTextInputStyle = (light?: boolean, hasLabelLink?: boolean, fullBleed?: boolean) => {
  // React Native on iOS
  const baseTextBox: any = {
    ...BodyCompact02(),
    height: 48,
    backgroundColor: getColor('field01'),
    borderColor: getColor('field01'),
    color: getColor('textPrimary'),
    borderBottomColor: getColor('borderStrong02'),
    borderWidth: 2,
    borderBottomWidth: 1,
    paddingRight: 16,
    paddingLeft: 18,
  };

  if (light) {
    baseTextBox.backgroundColor = getColor('field02');
    baseTextBox.borderColor = getColor('field02');
  }

  if (Platform.OS === 'ios') {
    // https://github.com/facebook/react-native/issues/29068
    // This seems to hide it but very hacky.
    baseTextBox.paddingBottom = 2;
  }

  if (fullBleed) {
    baseTextBox.backgroundColor = 'transparent';
    baseTextBox.borderColor = undefined;
    baseTextBox.borderWidth = undefined;
    baseTextBox.borderBottomWidth = undefined;
    baseTextBox.paddingLeft = 0;
    baseTextBox.paddingRight = 0;
  }

  return StyleSheet.create({
    wrapper: {
      paddingTop: hasLabelLink ? undefined : 22,
    },
    labelWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    label: {
      color: getColor('textSecondary'),
      flex: 1,
      paddingTop: hasLabelLink ? 30 : undefined,
      marginBottom: fullBleed ? 5 : 8,
    },
    helperText: {
      color: getColor('textHelper'),
      marginTop: 8,
      marginBottom: fullBleed ? 20 : undefined,
    },
    errorText: {
      color: getColor('textError'),
      marginTop: 8,
      marginBottom: fullBleed ? 20 : undefined,
    },
    warningText: {
      marginTop: 8,
      marginBottom: fullBleed ? 20 : undefined,
    },
    textBox: baseTextBox,
    textBoxDisabled: {
      ...baseTextBox,
      color: getColor('textDisabled'),
      borderBottomColor: 'transparent',
    },
    textBoxActive: {
      ...baseTextBox,
      borderStyle: 'solid',
      borderColor: getColor('focus'),
      borderBottomColor: getColor('focus'),
      paddingRight: 14,
      borderBottomWidth: 2,
    },
    textBoxError: {
      ...baseTextBox,
      borderStyle: 'solid',
      borderColor: getColor('supportError'),
      borderBottomColor: getColor('supportError'),
      paddingRight: 14,
      borderBottomWidth: 2,
    },
    textBoxWrapper: {
      position: 'relative',
    },
    passwordRevealButton: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    dateIcon: {
      position: 'absolute',
      padding: 13,
      top: 0,
      right: 0,
    },
    errorIcon: {
      position: 'absolute',
      padding: 13,
      top: fullBleed ? '100%' : 0,
      right: 0,
    },
    numberActions: {
      position: 'absolute',
      top: 0,
      right: 0,
      flexDirection: 'row',
    },
    numberActionsDivider: {
      backgroundColor: getColor('layer02'),
      width: 1,
      height: 20,
      marginTop: 14,
    },
    numberActionsButton: {
      padding: 14,
    },
    labelLink: {
      paddingBottom: 0,
      paddingTop: 30,
    },
  });
};

/**
 * @ignore
 * This is the base system for text input.
 * This allows a shared code base for all text input systems and validation rules
 * This component is not exported. It is used by `TextInput`, `TextArea` and `PasswordInput`.
 */
export class BaseTextInput extends React.Component<BaseTextInputProps & TextInputProps> {
  state = {
    dirty: false,
    hasFocus: false,
    revealPassword: false,
  };

  private get styles() {
    const { light, labelLink, fullBleedCallback } = this.props;

    return getTextInputStyle(light, !!labelLink, !!fullBleedCallback);
  }

  private onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    const { onFocus } = this.props;

    if (typeof onFocus === 'function') {
      onFocus(event);
    }
    this.setState({ hasFocus: true });
  };

  private onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    const { onBlur } = this.props;

    if (typeof onBlur === 'function') {
      onBlur(event);
    }
    this.setState({ hasFocus: false });
  };

  private onChange = (value: string): void => {
    const { onChangeText, type, numberRules } = this.props;

    if (type === 'number' && value) {
      if (Number.isNaN(Number(value))) {
        value = String(numberRules?.min || 0);
      }

      const invalidMin = typeof numberRules?.min === 'number' ? numberRules.min >= Number(value) : false;
      const invalidMax = typeof numberRules?.max === 'number' ? numberRules.max <= Number(value) : false;

      if (invalidMin) {
        value = String(numberRules?.min || 0);
      }

      if (invalidMax) {
        value = String(numberRules?.max || 0);
      }
    }

    if (typeof onChangeText === 'function') {
      onChangeText(value);
    }

    this.setState({ dirty: true });
  };

  private get passwordReveal(): React.ReactNode {
    const { revealPassword } = this.state;
    const { togglePasswordText, disabled } = this.props;

    return <Button overrideColor={disabled ? getColor('iconDisabled') : getColor('iconSecondary')} disabled={disabled} style={this.styles.passwordRevealButton} iconOnlyMode={true} kind="ghost" icon={revealPassword ? ViewOffIcon : ViewIcon} text={togglePasswordText || defaultText.passwordRevealButton} onPress={() => this.setState({ revealPassword: !revealPassword })} />;
  }

  private get dateIcon(): React.ReactNode {
    const { disabled } = this.props;

    return <View style={this.styles.dateIcon}>{createIcon(CalendarIcon, 20, 20, disabled ? getColor('iconDisabled') : getColor('iconSecondary'))}</View>;
  }

  private get baseErrorWarningStyle() {
    const { type } = this.props;
    let errorIconStyle = styleReferenceBreaker(this.styles.errorIcon);

    if (type === 'password' || type === 'date') {
      errorIconStyle.right = 48;
      errorIconStyle.paddingRight = 0;
      errorIconStyle.paddingLeft = 0;
    } else if (type === 'number') {
      errorIconStyle.right = 97;
      errorIconStyle.paddingRight = 0;
      errorIconStyle.paddingLeft = 0;
    }

    return errorIconStyle;
  }

  private get errorIndicator(): React.ReactNode {
    return <View style={this.baseErrorWarningStyle}>{createIcon(ErrorIcon, 20, 20, getColor('supportError'))}</View>;
  }

  private get warningIndicator(): React.ReactNode {
    return <View style={this.baseErrorWarningStyle}>{createIcon(WarningIcon, 20, 20, getColor('supportWarning'))}</View>;
  }

  private incrementNumber = (): void => {
    const { value } = this.props;

    const valueNumber = Number.isNaN(Number(value)) ? 0 : Number(value);

    this.onChange(String(valueNumber + 1));
  };

  private decrementNumber = (): void => {
    const { value } = this.props;

    const valueNumber = Number.isNaN(Number(value)) ? 0 : Number(value);

    this.onChange(String(valueNumber - 1));
  };

  private get numberActions(): React.ReactNode {
    const { numberRules, value, disabled, incrementNumberText, decrementNumberText } = this.props;

    const valueNumber = Number.isNaN(Number(value)) ? 0 : Number(value);
    const disableMin = typeof numberRules?.min === 'number' ? numberRules.min >= valueNumber : false;
    const disableMax = typeof numberRules?.max === 'number' ? numberRules.max <= valueNumber : false;
    const getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
      return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
    };

    const getPressable = (onPress: () => void, pressableDisabled: boolean, icon: unknown, text: string): React.ReactNode => {
      const finalDisabled = pressableDisabled || disabled || false;
      return (
        <Pressable style={(state) => pressableFeedbackStyle(state, this.styles.numberActionsButton, getStateStyle)} onPress={onPress} disabled={finalDisabled} accessibilityLabel={text} accessibilityHint={value}>
          {createIcon(icon, 20, 20, finalDisabled ? getColor('iconDisabled') : getColor('iconPrimary'))}
        </Pressable>
      );
    };

    return (
      <View style={this.styles.numberActions}>
        {getPressable(this.decrementNumber, disableMin, SubtractIcon, decrementNumberText || defaultText.decrementNumber)}
        <View style={this.styles.numberActionsDivider} />
        {getPressable(this.incrementNumber, disableMax, AddIcon, incrementNumberText || defaultText.incrementNumber)}
      </View>
    );
  }

  render(): React.ReactNode {
    const { label, helperText, getErrorText, value, autoCorrect, autoCapitalize, placeholder, maxLength, onSubmitEditing, componentProps, style, required, disabled, isInvalid, type, textAreaMinHeight, labelBreakMode, labelLink, fullBleedCallback, warningText } = this.props;
    const { hasFocus, dirty, revealPassword } = this.state;
    const password = type === 'password';
    const textArea = type === 'text-area';
    const date = type === 'date';
    const number = type === 'number';
    let textBoxStyle = styleReferenceBreaker(this.styles.textBox);
    let error = !!(required && dirty && !value) || (dirty && typeof isInvalid === 'function' && isInvalid(value));
    const fullBleedMode = typeof fullBleedCallback === 'function';

    if (fullBleedMode) {
      setTimeout(() => {
        fullBleedCallback(hasFocus, error);
      });
    }

    if (disabled) {
      textBoxStyle = styleReferenceBreaker(this.styles.textBoxDisabled);
    } else if (error && !fullBleedMode) {
      textBoxStyle = styleReferenceBreaker(this.styles.textBoxError);
    } else if (hasFocus && !fullBleedMode) {
      textBoxStyle = styleReferenceBreaker(this.styles.textBoxActive);
    }

    if (textArea) {
      textBoxStyle.height = textAreaMinHeight || 144;
      textBoxStyle.paddingTop = 12;
      textBoxStyle.paddingBottom = 12;
      textBoxStyle = styleReferenceBreaker(textBoxStyle, Body02());
    } else if (password || date) {
      textBoxStyle.paddingRight = 50;
    } else if (number) {
      textBoxStyle.paddingRight = 100;
    }

    if (error) {
      textBoxStyle.paddingRight = (textBoxStyle.paddingRight || 0) + 25;
    }

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)}>
        {!!(label || labelLink) && (
          <View style={this.styles.labelWrapper}>
            {!!label && <Text style={this.styles.label} type="label-02" text={label} breakMode={labelBreakMode} />}
            {!!labelLink && <Link {...labelLink} style={this.styles.labelLink} textType="label-02" />}
          </View>
        )}
        <View style={this.styles.textBoxWrapper} accessible={password}>
          <ReactTextInput editable={!disabled} accessibilityLabel={helperText ? `${label} - ${helperText}` : label} secureTextEntry={revealPassword ? false : password} autoCapitalize={autoCapitalize} style={textBoxStyle} value={value} onSubmitEditing={onSubmitEditing} onChangeText={this.onChange} autoCorrect={autoCorrect} placeholder={placeholder} placeholderTextColor={getColor('textPlaceholder')} onBlur={this.onBlur} onFocus={this.onFocus} maxLength={maxLength} textAlignVertical="top" multiline={textArea} {...(componentProps || {})} />
          {error && this.errorIndicator}
          {!!(warningText && !error) && this.warningIndicator}
          {password && this.passwordReveal}
          {date && this.dateIcon}
          {number && this.numberActions}
        </View>
        {!!(helperText && !error && !warningText) && <Text style={this.styles.helperText} type="helper-text-02" text={helperText} />}
        {!!(typeof getErrorText === 'function' && error) && <Text style={this.styles.errorText} type="helper-text-02" text={getErrorText(value)} />}
        {!!(warningText && !error) && <Text style={this.styles.warningText} type="helper-text-02" text={warningText} />}
      </View>
    );
  }
}
