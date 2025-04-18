import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { defaultText } from '../../constants/defaultText';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';
import RadioButtonIcon from '@carbon/icons/es/radio-button/20';
import RadioButtonCheckedIcon from '@carbon/icons/es/radio-button--checked/20';
import { checkboxRadioBaseStyle, CheckboxRadioProps } from '../Checkbox';

/**
 * RadioButton component for rendering a radio button
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/RadioButton.tsx | Example code}
 */
export class RadioButton extends React.Component<CheckboxRadioProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: checkboxRadioBaseStyle,
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { disabled } = this.props;

    const finalStyle: TextStyle = {
      color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
      marginLeft: 8,
      lineHeight: 20,
    };

    return finalStyle;
  }

  private get radioButton(): React.ReactNode {
    const { checked, disabled } = this.props;
    const color = disabled ? getColor('iconDisabled') : getColor('iconPrimary');

    return <View>{checked ? createIcon(RadioButtonCheckedIcon, 20, 20, color) : createIcon(RadioButtonIcon, 20, 20, color)}</View>;
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
    const { disabled, componentProps, label, accessibleText, hideLabel, style } = this.props;

    return (
      <Pressable style={styleReferenceBreaker(this.styles.wrapper, style)} disabled={disabled} accessibilityLabel={accessibleText || defaultText.radioButton} accessibilityHint={label} accessibilityRole="radio" onPress={this.onPress} onLongPress={this.onLongPress} {...(componentProps || {})}>
        {this.radioButton}
        {!hideLabel && <Text style={this.textStyle} text={label} />}
      </Pressable>
    );
  }
}
