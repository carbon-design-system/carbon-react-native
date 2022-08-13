import React from 'react';
import { GestureResponderEvent, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { defaultText } from '../../constants/defaultText';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';
import CheckboxIcon from '@carbon/icons/es/checkbox/20';
import CheckboxCheckedIcon from '@carbon/icons/es/checkbox--checked--filled/20';

export type CheckboxProps = {
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
  /** Text to use for checkbox (accessibility). Defaults to ENGLISH "Checkbox" */
  checkboxText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
}

export class Checkbox extends React.Component<CheckboxProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
        alignContent: 'flex-start',
      },
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const {disabled} = this.props;

    let finalStyle: any = {
      color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
      marginLeft: 8,
      lineHeight: 20,
    };

    return StyleSheet.create(finalStyle);
  }

  private get checkbox(): React.ReactNode {
    const {checked, disabled} = this.props;
    const finalParams = [20, 20, disabled ? getColor('iconDisabled') : getColor('iconPrimary')];

    return (
      <View>
        {checked ? createIcon(CheckboxCheckedIcon, ...finalParams) : createIcon(CheckboxIcon, ...finalParams)}
      </View>
    )
  }

  private onPress = (event: GestureResponderEvent): void => {
    const {onPress, checked, id} = this.props;

    if (typeof onPress === 'function') {
      onPress(!checked, id, event);
    }
  }

  private onLongPress = (event: GestureResponderEvent): void => {
    const {onLongPress, id} = this.props;

    if (typeof onLongPress === 'function') {
      onLongPress(id, event);
    }
  }

  render(): React.ReactNode {
    const {disabled, componentProps, label, checkboxText, hideLabel, style} = this.props;

    return (
      <Pressable style={styleReferenceBreaker(this.styles.wrapper, style)} disabled={disabled} accessibilityLabel={checkboxText || defaultText.checkbox} accessibilityHint={label} accessibilityRole="checkbox" onPress={this.onPress} onLongPress={this.onLongPress} {...(componentProps || {})}>
        {this.checkbox}
        {!hideLabel && <Text type="body-compact-02" style={this.textStyle} text={label} />}
      </Pressable>
    );
  }
}
