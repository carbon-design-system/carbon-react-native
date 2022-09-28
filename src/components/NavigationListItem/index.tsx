import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle, PressableStateCallbackType } from 'react-native';
import type { CarbonIcon } from '../../types/shared';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text, TextBreakModes } from '../Text';
import ChevronRightIcon from '@carbon/icons/es/chevron--right/20';
import { Checkbox, CheckboxRadioProps } from '../Checkbox';
import { RadioButton } from '../RadioButton';

export const getNavigationListItemStyle = () => {
  return {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    backgroundColor: getColor('layer01'),
    borderBottomColor: getColor('borderSubtle01'),
    borderBottomWidth: 1,
    minHeight: 48,
  };
};

export type NavigationListItemProps = {
  /** Text to render */
  text: string;
  /** Sub text to render */
  subText?: string;
  /** Custom content (will not render text if set. However; text is used for accesibility and still required) */
  customContent?: React.ReactNode;
  /** Indicate if right chevron arrow should be shown */
  hasChevron?: boolean;
  /** Icon to load on the left (size 20) */
  leftIcon?: CarbonIcon;
  /** Icon to load on the right (size 20) */
  rightIcon?: CarbonIcon;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Indicate if last item (different styling applied). Handled by `NavigationList`. */
  lastItem?: boolean;
  /** ID to get back on events */
  id?: string;
  /** Indicate if selectable row should be used (can be radio or checbox) */
  selectableType?: 'radio' | 'checkbox';
  /** On selectable row change */
  onSelectableRowChange?: (value: boolean, id?: string) => void;
  /** Indicate if row is selected (checked or active radio) */
  selected?: boolean;
  /** Indicate selectable side (default is left) */
  selectableSide?: 'right' | 'left';
  /** Text to use for selectable (accessibility). */
  selectableText?: string;
  /** onPress event */
  onPress?: (event: GestureResponderEvent, id?: string) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent, id?: string) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
};

export class NavigationListItem extends React.Component<NavigationListItemProps> {
  private get textIconColor(): string {
    const { disabled } = this.props;

    return getColor(disabled ? 'textDisabled' : 'textPrimary');
  }

  private get styles() {
    const { disabled } = this.props;

    return StyleSheet.create({
      wrapper: getNavigationListItemStyle(),
      pressableStyle: {
        paddingRight: 14,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      contentWrapper: {
        flex: 1,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 16,
      },
      mainText: {
        color: this.textIconColor,
      },
      subText: {
        color: getColor(disabled ? 'textDisabled' : 'textSecondary'),
      },
      leftIcon: {
        width: 48,
        height: 48,
        padding: 14,
      },
      rightIcon: {
        paddingTop: 13,
        paddingLeft: 8,
      },
      chevronIcon: {
        paddingTop: 13,
        paddingLeft: 8,
      },
      selectableArea: {
        width: 48,
        height: 48,
        justifyContent: 'center',
      },
    });
  }

  private onPress = (event: GestureResponderEvent): void => {
    const { dismissKeyboardOnPress, onPress, id } = this.props;

    if (dismissKeyboardOnPress && typeof Keyboard?.dismiss === 'function') {
      Keyboard.dismiss();
    }

    if (typeof onPress === 'function') {
      onPress(event, id);
    }
  };

  private onLongPress = (event: GestureResponderEvent): void => {
    const { onLongPress, id } = this.props;

    if (typeof onLongPress === 'function') {
      onLongPress(event, id);
    }
  };

  private get contentArea(): React.ReactNode {
    const { customContent, text, subText, textBreakMode } = this.props;

    const textItem = (
      <>
        <Text style={this.styles.mainText} text={text} breakMode={textBreakMode} />
        {!!subText && <Text style={this.styles.subText} type="helper-text-01" text={subText} breakMode={textBreakMode} />}
      </>
    );

    return <View style={this.styles.contentWrapper}>{customContent ? customContent : textItem}</View>;
  }

  private get selectableAreaSide(): 'right' | 'left' | undefined {
    const { selectableType, selectableSide } = this.props;

    if (selectableType) {
      return selectableSide || 'left';
    }

    return undefined;
  }

  private get selectableArea(): React.ReactNode {
    const { selectableType, selected, onSelectableRowChange, id, text, disabled, selectableText } = this.props;

    if (selectableType) {
      const selectableProps: CheckboxRadioProps = {
        label: text,
        id: id || '',
        checked: !!selected,
        hideLabel: true,
        disabled: disabled,
        accessibleText: selectableText,
        style: this.styles.selectableArea,
        onPress: (value: boolean) => {
          if (typeof onSelectableRowChange === 'function') {
            onSelectableRowChange(value, id);
          }
        },
      };

      return selectableType === 'checkbox' ? <Checkbox {...selectableProps} /> : <RadioButton {...selectableProps} />;
    }

    return null;
  }

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  render(): React.ReactNode {
    const { text, disabled, componentProps, style, leftIcon, rightIcon, hasChevron, lastItem } = this.props;
    const finalStyle = styleReferenceBreaker(this.styles.wrapper);

    if (lastItem) {
      finalStyle.borderBottomWidth = 0;
    }

    return (
      <View style={styleReferenceBreaker(finalStyle, style)}>
        {this.selectableAreaSide === 'left' && this.selectableArea}
        <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, this.styles.pressableStyle, this.getStateStyle)} accessibilityLabel={text} accessibilityRole="button" onPress={this.onPress} onLongPress={this.onLongPress} {...(componentProps || {})}>
          {!!leftIcon && <View style={this.styles.leftIcon}>{createIcon(leftIcon, 20, 20, this.textIconColor)}</View>}
          {this.contentArea}
          {!!rightIcon && <View style={this.styles.rightIcon}>{createIcon(rightIcon, 20, 20, this.textIconColor)}</View>}
          {!!hasChevron && <View style={this.styles.chevronIcon}>{createIcon(ChevronRightIcon, 20, 20, this.textIconColor)}</View>}
        </Pressable>
        {this.selectableAreaSide === 'right' && this.selectableArea}
      </View>
    );
  }
}
