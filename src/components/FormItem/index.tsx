import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, ViewProps, Pressable, GestureResponderEvent, Keyboard } from 'react-native';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { Text, TextBreakModes } from '../Text';
import { BaseTextInput, getTextInputStyle } from '../BaseTextInputs';
import { TextInputProps, BaseTextInputTypes } from '../../types/shared';
import { getNavigationListItemStyle } from '../NavigationListItem';
import { getColor } from '../../styles/colors';
import ChevronRightIcon from '@carbon/icons/es/chevron--right/20';
import CheckmarkIcon from '@carbon/icons/es/checkmark--outline/20';
import EmptyCheckmarkIcon from '@carbon/icons/es/radio-button/20';
import type { CarbonIcon } from '../../types/shared';
import { Toggle } from '../Toggle';
import { Slider } from '../Slider';

/**
 * `text` - plain text input. Use textInputProps for advanced controls.
 * `password` - secure text input. Use textInputProps for advanced controls.
 * `textarea` - plain text input with multi line support. Use textInputProps for advanced controls.
 * `toggle` - Toggle field
 * `toggle-inline` - Toggle inline (single line) field. Label and toggle are on single line (not stacked)
 * `header` - Header with text and supported secondary text. This is for logical breaking up of form items.
 * `static` - Static data to render (view only)
 * `slider` - Slider bar to render
 * `checkbox` - Checkbox to render. This can also be used as radio for checking proper items in the list.  Use `overrideActiveCheckboxIcon` to override the icon
 * `button` - Button to render. Supports icon via `buttonIcon`.
 * `divider` - Empty space to divide form items.
 */
export type FormItemType = 'text' | 'password' | 'text-area' | 'number' | 'date' | 'toggle' | 'toggle-inline' | 'header' | 'header-compact' | 'static' | 'slider' | 'checkbox' | 'button' | 'divider';

/** Props for FormItem component */
export type FormItemProps = {
  /** The type of form item */
  type: FormItemType;
  /** Value to render or show for static data. This is not used for type header. Boolean is used for toggle and checkbox. */
  value?: string | boolean;
  /** label to render */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Indicate if last item of a group form (after is a break or header normally). */
  lastItem?: boolean;
  /** On change event. This is a boolean for toggle or string for others. */
  onChange?: (value: string | boolean) => void;
  /** Break mode for non editable text */
  textBreakMode?: TextBreakModes;
  /** Icon to render for right side for type button. Usually this would be a RightChevron */
  buttonIcon?: CarbonIcon;
  /** Text input props.  Mostly used for events (blur/focus) and validation. Do not use value or onChange event. That is overriden by this component. */
  textInputProps?: Partial<TextInputProps>;
  /** onPress event for button type */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event for button type */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Toggle text exchange by value. This should show content on the UI like Yes/No or Off/On */
  toggleValueText?: (value: boolean) => string;
  /** Override icon for select item (default is Checkbox) */
  overrideActiveCheckboxIcon?: CarbonIcon;
  /** Indicate that toggle or checkbox should render on the left side. Default is right. This does not apply to `toggle-inline` */
  renderToggleCheckboxLeft?: boolean;
  /** Slider props for customizing slider */
  sliderProps?: {
    /** Icon to render on right side of slider */
    rightIcon?: CarbonIcon;
    /** Icon to render on left side of slider */
    leftIcon?: CarbonIcon;
    /** Min value for slider (defaults to 0) */
    minValue?: number;
    /** Max value for slider (defaults to 100) */
    maxValue?: number;
    /** Indicate if range labels should be hidden (normally should hide if using icons) */
    hideRangeLabels?: boolean;
  };
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
  /** Indicate that header should be description first */
  descriptionFirstHeader?: boolean;
};

/**
 * FormItem component for rendering form items that are full bleed. This renders multiple types of form items. See props for types.
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/FormItem.tsx | Example code}
 */

export class FormItem extends React.Component<FormItemProps> {
  state = {
    error: false,
    active: false,
  };

  private get noBottomPadding(): boolean {
    const { type } = this.props;
    return ['password', 'number', 'date', 'text', 'text-area', 'header', 'header-compact', 'divider'].includes(type);
  }

  private get noDirectHelperText(): boolean {
    const { type } = this.props;
    return this.noBottomPadding || ['checkbox'].includes(type);
  }

  private get noDirectLabel(): boolean {
    const { type } = this.props;
    return ['header', 'header-compact', 'divider', 'button', 'checkbox', 'toggle-inline'].includes(type);
  }

  private get mainColor(): string {
    const { disabled } = this.props;

    return getColor(disabled ? 'textDisabled' : 'textPrimary');
  }

  private get styles() {
    const { type, disabled, renderToggleCheckboxLeft } = this.props;
    const noRightPadding = ['password', 'number', 'date'].includes(type);
    const noBottomPadding = this.noBottomPadding;
    const helperTextColor = getColor(disabled ? 'textDisabled' : 'textHelper');

    const baseWrapper = styleReferenceBreaker<ViewStyle>(getNavigationListItemStyle(), {
      flexDirection: 'column',
      padding: 14,
      paddingRight: noRightPadding ? 0 : 16,
      paddingLeft: 16,
      paddingBottom: noBottomPadding ? 0 : 14,
      borderColor: 'transparent',
      borderWidth: 2,
    });

    return StyleSheet.create({
      wrapper: baseWrapper,
      headerWrapper: {
        padding: 16,
        paddingTop: 32,
      },
      headerCompactWrapper: {
        padding: 16,
      },
      dividerWrapper: {
        height: 32,
      },
      contentArea: {
        width: '100%',
        flexDirection: 'column',
      },
      headerContent: {
        color: getColor('textSecondary'),
      },
      headerContentDescription: {
        color: getColor('textSecondary'),
        paddingTop: 4,
      },
      staticText: {
        paddingTop: 8,
        color: getColor('textSecondary'),
      },
      textInput: {
        width: '100%',
        paddingTop: 0,
      },
      buttonText: {
        color: this.mainColor,
        flex: 1,
      },
      toggleText: {
        color: this.mainColor,
        flex: 1,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: renderToggleCheckboxLeft ? 30 : undefined,
      },
      toggleInlineText: {
        paddingTop: 13,
        paddingBottom: 13,
        marginRight: 12,
        color: getColor(disabled ? 'textDisabled' : 'textSecondary'),
      },
      toggleInlineLabel: {
        color: this.mainColor,
        flex: 1,
        paddingTop: 13,
        paddingBottom: 13,
      },
      toggleWrapper: {
        paddingTop: 0,
      },
      toggleDirectWrapper: {
        paddingTop: 8,
      },
      sliderIcons: {
        paddingTop: 14,
      },
      slider: {
        flex: 1,
      },
      helperText: {
        color: helperTextColor,
      },
      checkboxButton: {
        ...baseWrapper,
        flex: 1,
        flexDirection: 'row',
      },
      checkboxHelperText: {
        color: helperTextColor,
        marginTop: 0,
      },
      checkboxTextWrapper: {
        flex: 1,
        paddingLeft: renderToggleCheckboxLeft ? 30 : undefined,
      },
    });
  }

  private triggerChange = (value: string | boolean): void => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  private onPress = (event: GestureResponderEvent): void => {
    const { dismissKeyboardOnPress, onPress } = this.props;

    if (dismissKeyboardOnPress && typeof Keyboard?.dismiss === 'function') {
      Keyboard.dismiss();
    }

    if (typeof onPress === 'function') {
      onPress(event);
    }
  };

  private get headerContent(): React.ReactNode {
    const { label, helperText, descriptionFirstHeader } = this.props;
    const items = [];

    if (label) {
      items.push(<Text key="label" style={this.styles.headerContent} type="heading-compact-01" text={label} />);
    }

    if (helperText) {
      items.push(<Text key="helperText" style={this.styles.headerContentDescription} type="helper-text-01" text={helperText} />);
    }

    if (descriptionFirstHeader) {
      items.reverse();
    }

    return items;
  }

  private get inputContent(): React.ReactNode {
    const { type, value, textInputProps, disabled, helperText } = this.props;

    const changeText = (textValue: string) => {
      this.triggerChange(textValue);
    };

    const handleFullBleed = (newActive: boolean, newError: boolean): void => {
      const { active, error } = this.state;

      if (active !== newActive || error !== newError) {
        this.setState({ active: newActive, error: newError });
      }
    };

    return <BaseTextInput {...(textInputProps || {})} fullBleedCallback={handleFullBleed} style={this.styles.textInput} type={type as BaseTextInputTypes} disabled={disabled} helperText={helperText} value={String(value || '')} onChangeText={changeText} />;
  }

  private get toggleContent(): React.ReactNode {
    const { label, textBreakMode, disabled, value, toggleValueText, renderToggleCheckboxLeft, type } = this.props;
    const inline = type === 'toggle-inline';

    const changeValue = (textValue: boolean) => {
      this.triggerChange(textValue);
    };

    const items = [<Text key="label" text={typeof toggleValueText === 'function' ? toggleValueText(!!value) : String(value)} style={inline ? this.styles.toggleInlineText : this.styles.toggleText} breakMode={textBreakMode} />, <Toggle key="toggle" label={label || ''} style={this.styles.toggleWrapper} toggleWrapperStyle={this.styles.toggleDirectWrapper} hideLabel={true} disabled={disabled} toggled={!!value} onChange={changeValue} />];

    if (inline) {
      items.unshift(<Text style={this.styles.toggleInlineLabel} text={label} />);
    }

    return renderToggleCheckboxLeft && !inline ? items.reverse() : items;
  }

  private get staticContent(): React.ReactNode {
    const { value, textBreakMode } = this.props;

    return <Text style={this.styles.staticText} text={String(value || '')} breakMode={textBreakMode} />;
  }

  private get sliderContent(): React.ReactNode {
    const { label, value, disabled, sliderProps } = this.props;

    const changeValue = (sliderValue: number) => {
      this.triggerChange(String(sliderValue));
    };

    return (
      <>
        {!!sliderProps?.leftIcon && <View style={this.styles.sliderIcons}>{createIcon(sliderProps.leftIcon, 20, 20, this.mainColor)}</View>}
        <Slider style={this.styles.slider} value={Number(value)} label={label || ''} minValue={sliderProps?.minValue || 0} maxValue={sliderProps?.maxValue || 100} hideRangeLabels={sliderProps?.hideRangeLabels} onChange={changeValue} disabled={disabled} hideTextInput={true} hideLabel={true} />
        {!!sliderProps?.rightIcon && <View style={this.styles.sliderIcons}>{createIcon(sliderProps.rightIcon, 20, 20, this.mainColor)}</View>}
      </>
    );
  }

  private get checkboxContent(): React.ReactNode {
    const { label, textBreakMode, disabled, value, helperText, overrideActiveCheckboxIcon, renderToggleCheckboxLeft } = this.props;

    const changeValue = () => {
      this.triggerChange(!value);
    };

    const items = [
      <View style={this.styles.checkboxTextWrapper} key="label">
        <Text text={label} breakMode={textBreakMode} />
        {!!helperText && <Text type="helper-text-02" style={[getTextInputStyle().helperText, this.styles.checkboxHelperText]} text={helperText} />}
      </View>,
      createIcon(value ? overrideActiveCheckboxIcon || CheckmarkIcon : EmptyCheckmarkIcon, 20, 20, this.mainColor, 'icon'),
    ];

    return (
      <Pressable style={this.styles.checkboxButton} disabled={disabled} accessibilityLabel={label} accessibilityRole="button" onPress={changeValue}>
        {renderToggleCheckboxLeft ? items.reverse() : items}
      </Pressable>
    );
  }

  private get buttonContent(): React.ReactNode {
    const { label, textBreakMode, buttonIcon } = this.props;

    return (
      <>
        <Text text={label} style={this.styles.buttonText} breakMode={textBreakMode} />
        {createIcon(buttonIcon || ChevronRightIcon, 20, 20, this.mainColor)}
      </>
    );
  }

  private get contentArea(): React.ReactNode {
    const { type } = this.props;
    let content: React.ReactNode = null;
    const finalStyle: ViewStyle = styleReferenceBreaker(this.styles.contentArea);

    switch (type) {
      case 'header':
      case 'header-compact':
        content = this.headerContent;
        break;
      case 'toggle':
      case 'toggle-inline':
        content = this.toggleContent;
        finalStyle.flexDirection = 'row';
        break;
      case 'static':
        content = this.staticContent;
        break;
      case 'slider':
        content = this.sliderContent;
        finalStyle.flexDirection = 'row';
        break;
      case 'checkbox':
        content = this.checkboxContent;
        finalStyle.flexDirection = 'row';
        break;
      case 'button':
        content = this.buttonContent;
        finalStyle.flexDirection = 'row';
        break;
      case 'divider':
        content = null;
        break;
      case 'text':
      case 'password':
      case 'text-area':
      case 'number':
      case 'date':
      default:
        content = this.inputContent;
        break;
    }

    return <View style={finalStyle}>{content}</View>;
  }

  private get wrapperStyle() {
    const { type } = this.props;

    switch (type) {
      case 'header':
        return this.styles.headerWrapper;
      case 'header-compact':
        return this.styles.headerCompactWrapper;
      case 'divider':
        return this.styles.dividerWrapper;
      default:
        return this.styles.wrapper;
    }
  }

  render(): React.ReactNode {
    const { componentProps, style, lastItem, label, helperText, type, onLongPress, disabled } = this.props;
    const { active, error } = this.state;
    const finalStyle: ViewStyle = styleReferenceBreaker(this.wrapperStyle);

    if (lastItem) {
      finalStyle.borderBottomWidth = 0;
    }

    if (error) {
      finalStyle.borderBottomWidth = 2;
      finalStyle.borderColor = getColor('supportError');
      finalStyle.borderBottomColor = getColor('supportError');
    } else if (active) {
      finalStyle.borderBottomWidth = 2;
      finalStyle.borderColor = getColor('focus');
      finalStyle.borderBottomColor = getColor('focus');
    }

    const primaryContent = (
      <>
        {!!(label && !this.noDirectLabel) && <Text type="label-02" style={getTextInputStyle().label} text={label} />}
        {this.contentArea}
        {!!(helperText && !this.noDirectHelperText) && <Text type="helper-text-02" style={[getTextInputStyle().helperText, this.styles.helperText]} text={helperText} />}
      </>
    );

    if (type === 'button') {
      return (
        <Pressable style={[finalStyle, style]} disabled={disabled} accessibilityLabel={label} accessibilityRole="button" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
          {primaryContent}
        </Pressable>
      );
    }

    if (type === 'checkbox') {
      return this.contentArea;
    }

    return (
      <View style={[finalStyle, style]} {...(componentProps || {})}>
        {primaryContent}
      </View>
    );
  }
}
