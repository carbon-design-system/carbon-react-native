import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle, PressableStateCallbackType } from 'react-native';
import type { CarbonIcon } from '../../types/shared';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text, TextBreakModes } from '../Text';
import ChevronRightIcon from '@carbon/icons/es/chevron--right/20';
import { Checkbox, CheckboxRadioProps } from '../Checkbox';
import { RadioButton } from '../RadioButton';

export const getNavigationListItemStyle = (): ViewStyle => {
  return {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    backgroundColor: getColor('layer01'),
    borderBottomColor: getColor('borderSubtle01'),
    borderBottomWidth: 1,
    minHeight: 48,
  };
};

/** Props for NavigationListItem component */
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
  /** Text to load on the right side (to left of right icon if both used) */
  rightText?: string;
  /** Indicate if unread badge should be rendered */
  unreadBadge?: boolean;
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
  /** On selectable row change. If no onPress this will trigger via the full row. */
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
  /** Indicate that subText should be rendered on top */
  reverseSubText?: boolean;
};

/**
 * NavigationListItem component for rendering a navigation list item (used by NavigationList)
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/NavigationList.tsx | Example code}
 */
export class NavigationListItem extends React.Component<NavigationListItemProps> {
  private get textIconColor(): string {
    const { disabled } = this.props;

    return getColor(disabled ? 'textDisabled' : 'textPrimary');
  }

  private get styles() {
    const { disabled, subText, reverseSubText, unreadBadge } = this.props;

    const topPadding = subText && reverseSubText ? 29 : 13;

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
        paddingLeft: unreadBadge ? 30 : 16,
        position: 'relative',
      },
      mainText: {
        color: this.textIconColor,
      },
      subText: {
        color: getColor(disabled ? 'textDisabled' : 'textSecondary'),
      },
      leftIcon: {
        paddingTop: topPadding,
        width: 48,
        height: 48,
        padding: 14,
      },
      unreadBadge: {
        width: 6,
        height: 6,
        backgroundColor: getColor('buttonPrimary'),
        borderRadius: 6,
        position: 'absolute',
        left: 17,
        top: topPadding + 9,
      },
      rightIcon: {
        paddingTop: topPadding,
        paddingLeft: 8,
      },
      rightText: {
        paddingTop: topPadding,
        paddingLeft: 8,
      },
      rightTextItem: {
        color: getColor(disabled ? 'textDisabled' : 'textSecondary'),
      },
      chevronIcon: {
        paddingTop: topPadding,
        paddingLeft: 8,
      },
      selectableArea: {
        paddingTop: topPadding,
        width: 48,
        height: 48,
        justifyContent: 'center',
      },
    });
  }

  private onPress = (event: GestureResponderEvent): void => {
    const { dismissKeyboardOnPress, onPress, id, onSelectableRowChange, selected } = this.props;

    if (dismissKeyboardOnPress && typeof Keyboard?.dismiss === 'function') {
      Keyboard.dismiss();
    }

    if (typeof onPress === 'function') {
      onPress(event, id);
    } else if (typeof onSelectableRowChange === 'function') {
      onSelectableRowChange(!selected, id);
    }
  };

  private onLongPress = (event: GestureResponderEvent): void => {
    const { onLongPress, id } = this.props;

    if (typeof onLongPress === 'function') {
      onLongPress(event, id);
    }
  };

  private get contentArea(): React.ReactNode {
    const { customContent, text, subText, textBreakMode, reverseSubText, unreadBadge } = this.props;
    const items = [<Text key="text" style={this.styles.mainText} text={text} breakMode={textBreakMode} />];

    if (subText) {
      items.push(<Text key="subText" style={this.styles.subText} type="helper-text-01" text={subText} breakMode={reverseSubText ? 'tail' : textBreakMode} />);
    }

    if (reverseSubText) {
      items.reverse();
    }

    if (unreadBadge) {
      items.unshift(<View style={this.styles.unreadBadge} key="unread" />);
    }

    const textItem = items;

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

  render() {
    const { text, disabled, componentProps, style, leftIcon, rightIcon, hasChevron, lastItem, rightText, onPress, onLongPress } = this.props;
    const finalStyle = styleReferenceBreaker(this.styles.wrapper);

    if (lastItem) {
      finalStyle.borderBottomWidth = 0;
    }

    const mainIsClickable = !!(typeof onPress === 'function' || typeof onLongPress === 'function');

    return (
      <View style={[finalStyle, style]}>
        {this.selectableAreaSide === 'left' && this.selectableArea}
        <Pressable disabled={disabled} style={(state) => (mainIsClickable ? pressableFeedbackStyle(state, this.styles.pressableStyle, this.getStateStyle) : this.styles.pressableStyle)} accessibilityLabel={text} accessibilityRole="button" onPress={this.onPress} onLongPress={this.onLongPress} {...(componentProps || {})}>
          {!!leftIcon && <View style={this.styles.leftIcon}>{createIcon(leftIcon, 20, 20, this.textIconColor)}</View>}
          {this.contentArea}
          {!!rightText && (
            <View style={this.styles.rightText}>
              <Text text={rightText} style={this.styles.rightTextItem} />
            </View>
          )}
          {!!rightIcon && <View style={this.styles.rightIcon}>{createIcon(rightIcon, 20, 20, this.textIconColor)}</View>}
          {!!hasChevron && <View style={this.styles.chevronIcon}>{createIcon(ChevronRightIcon, 20, 20, this.textIconColor)}</View>}
        </Pressable>
        {this.selectableAreaSide === 'right' && this.selectableArea}
      </View>
    );
  }
}
