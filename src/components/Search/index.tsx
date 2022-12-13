import React from 'react';
import { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, View, ViewStyle, TextInput as ReactTextInput, TextInputProps as ReactTextInputProps } from 'react-native';
import { styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Button } from '../Button';
import { Text, TextBreakModes } from '../Text';
import CloseIcon from '@carbon/icons/es/close/20';
import SearchIcon from '@carbon/icons/es/search/20';
import { defaultText } from '../../constants/defaultText';
import { getTextInputStyle } from '../BaseTextInputs';

/** Shared props for Text, Password and TextArea */
export type SearchProps = {
  /** Value of text (Controlled component) */
  value: string;
  /** Label string to use */
  label?: string;
  /** Placeholder text to use */
  placeholder?: string;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Label break mode */
  labelBreakMode?: TextBreakModes;
  /** Change event when text changed */
  onChangeText: (value: string) => void;
  /** Blur event when focus is lost */
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Focus event when focus is gained */
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Indicate if autoCorrect should be used (default is true) */
  autoCorrect?: boolean;
  /** Define auto cap rule (default is normally sentences) */
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  /** Trigger ENTER event (consumer should validate if form is valid and submit if this is called) */
  onSubmitEditing?: () => void;
  /** Max length of field */
  maxLength?: number;
  /** Indicate if text box is used on layer */
  light?: boolean;
  /** Text to use for clear text button (accessibility). Defaults to ENGLISH "Clear" */
  clearTextButtonText?: string;
  /** Text to use for search icon (accessibility). Defaults to ENGLISH "Search" */
  searchIconText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Helpful for fully customizing text input behavior. */
  componentProps?: ReactTextInputProps;
};

export class Search extends React.Component<SearchProps> {
  state = {
    hasFocus: false,
  };

  private get styles() {
    const { light } = this.props;

    return getTextInputStyle(light);
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
    const { onChangeText } = this.props;

    if (typeof onChangeText === 'function') {
      onChangeText(value);
    }

    this.setState({});
  };

  private get clearText(): React.ReactNode {
    const { disabled, clearTextButtonText } = this.props;

    return <Button overrideColor={disabled ? getColor('iconDisabled') : getColor('iconSecondary')} disabled={disabled} style={this.styles.passwordRevealButton} iconOnlyMode={true} kind="ghost" icon={CloseIcon} text={clearTextButtonText || defaultText.clear} onPress={() => this.onChange('')} />;
  }

  private get searchIcon(): React.ReactNode {
    const { disabled, searchIconText, onSubmitEditing } = this.props;
    const finalStyle = styleReferenceBreaker(this.styles.passwordRevealButton);

    finalStyle.right = undefined;
    finalStyle.left = 0;
    finalStyle.top = 1;

    return <Button overrideColor={disabled ? getColor('iconDisabled') : getColor('iconSecondary')} disabled={disabled} style={finalStyle} iconOnlyMode={true} kind="ghost" icon={SearchIcon} text={searchIconText || defaultText.search} onPress={onSubmitEditing} />;
  }

  render(): React.ReactNode {
    const { label, value, autoCorrect, autoCapitalize, placeholder, maxLength, onSubmitEditing, componentProps, style, disabled, labelBreakMode } = this.props;
    const { hasFocus } = this.state;
    let textBoxStyle = styleReferenceBreaker(this.styles.textBox);

    if (disabled) {
      textBoxStyle = styleReferenceBreaker(this.styles.textBoxDisabled);
    } else if (hasFocus) {
      textBoxStyle = styleReferenceBreaker(this.styles.textBoxActive);
    }

    textBoxStyle.paddingLeft = 50;
    textBoxStyle.paddingRight = 50;

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style || {})} accessibilityLabel={label}>
        {!!label && <Text style={this.styles.label} type="label-02" text={label} breakMode={labelBreakMode} />}
        <View style={this.styles.textBoxWrapper} accessibilityLabel={label}>
          <ReactTextInput editable={!disabled} autoCapitalize={autoCapitalize} style={textBoxStyle} value={value} onSubmitEditing={onSubmitEditing} onChangeText={this.onChange} autoCorrect={autoCorrect} placeholder={placeholder} placeholderTextColor={getColor('textPlaceholder')} onBlur={this.onBlur} onFocus={this.onFocus} maxLength={maxLength} textAlignVertical="top" {...(componentProps || {})} />
          {this.searchIcon}
          {!!value && this.clearText}
        </View>
      </View>
    );
  }
}
