import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { defaultText } from '../../constants/defaultText';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';
import RadioButtonIcon from '@carbon/icons/es/radio-button/20';
import RadioButtonCheckedIcon from '@carbon/icons/es/radio-button--checked/20';
import { checkboxRadioBaseStyle, CheckboxRadioProps } from '../Checkbox';

export class RadioButton extends React.Component<CheckboxRadioProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: checkboxRadioBaseStyle,
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { disabled } = this.props;

    let finalStyle: any = {
      color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
      marginLeft: 8,
      lineHeight: 20,
    };

    return StyleSheet.create(finalStyle);
  }

  private get radioButton(): React.ReactNode {
    const { checked, disabled } = this.props;
    const finalParams = [20, 20, disabled ? getColor('iconDisabled') : getColor('iconPrimary')];

    return <View>{checked ? createIcon(RadioButtonCheckedIcon, ...finalParams) : createIcon(RadioButtonIcon, ...finalParams)}</View>;
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
