import React from 'react';
import { GestureResponderEvent, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { defaultText } from '../../constants/defaultText';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';
import CheckboxIcon from '@carbon/icons/es/checkbox/20';
import CheckboxCheckedIcon from '@carbon/icons/es/checkbox--checked--filled/20';
import { Tooltip, TooltipProps } from '../Tooltip';

export const checkboxRadioBaseStyle = {
  paddingTop: 14,
  paddingBottom: 14,
  minWidth: 48,
  flexDirection: 'row' as const,
  alignContent: 'flex-start' as const,
};

/** Props for Checkbox and Radio component */
export type CheckboxRadioProps = {
  /** Text to render */
  label: string;
  /** ID of item (any identifier to identify the checkbox) */
  id: string;
  /** Indicate if checked */
  checked: boolean;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Indicate if label should be hidden (label is used for accessibility even when hidden)  */
  hideLabel?: boolean;
  /** onPress event returns the current value and ID of the item */
  onPress: (value: boolean, id: string, event: GestureResponderEvent) => void;
  /** onLongPress event returns the ID of the item (value is not changed) */
  onLongPress?: (id: string, event: GestureResponderEvent) => void;
  /** Text to use for checkbox (accessibility). Defaults to ENGLISH "Checkbox"/"Radio button" depending on use */
  accessibleText?: string;
  /** Tooltip props to show at the end of the text */
  tooltipProps?: TooltipProps;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Style to set on the checkbox wrapper */
  wrapperStyle?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
};

/**
 * Checkbox component for rendering a checkbox
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Checkbox.tsx | Example code}
 */
export class Checkbox extends React.Component<CheckboxRadioProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: checkboxRadioBaseStyle,
      checkboxWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      },
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { disabled } = this.props;

    const finalStyle: TextStyle = {
      color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
      marginLeft: 8,
      lineHeight: 20,
      maxWidth: '100%',
    };

    return finalStyle;
  }

  private get checkbox(): React.ReactNode {
    const { checked, disabled } = this.props;
    const color = disabled ? getColor('iconDisabled') : getColor('iconPrimary');

    return <View>{checked ? createIcon(CheckboxCheckedIcon, 20, 20, color) : createIcon(CheckboxIcon, 20, 20, color)}</View>;
  }

  private onPress = (event: GestureResponderEvent): void => {
    const { onPress, checked, id } = this.props;

    if (typeof onPress === 'function') {
      onPress(!checked, id, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent): void => {
    const { onLongPress, id } = this.props;

    if (typeof onLongPress === 'function') {
      onLongPress(id, event);
    }
  };

  render(): React.ReactNode {
    const { disabled, componentProps, label, accessibleText, hideLabel, style, tooltipProps, wrapperStyle } = this.props;

    return (
      <View style={styleReferenceBreaker(this.styles.checkboxWrapper, wrapperStyle)}>
        <Pressable style={styleReferenceBreaker(this.styles.wrapper, style)} disabled={disabled} accessibilityLabel={accessibleText || defaultText.checkbox} accessibilityHint={label} accessibilityRole="checkbox" onPress={this.onPress} onLongPress={this.onLongPress} {...(componentProps || {})}>
          {this.checkbox}
          {!hideLabel && <Text style={this.textStyle} text={label} />}
        </Pressable>
        {!!tooltipProps && <Tooltip {...tooltipProps} />}
      </View>
    );
  }
}
