import React from 'react';
import { GestureResponderEvent, Keyboard, Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import type { CarbonIcon } from '../../types/shared';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text, TextBreakModes } from '../Text';
import ChevronRightIcon from '@carbon/icons/es/chevron--right/20';

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
  /** onPress event */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
};

/**
 * To not have a link be pressable 100% of screen format parent or pass style appropriately.
 * alignSelf: 'flex-start' is useful for this
 */
export class NavigationListItem extends React.Component<NavigationListItemProps> {
  private get textIconColor(): string {
    const { disabled } = this.props;

    return getColor(disabled ? 'textDisabled' : 'textPrimary');
  }

  private get styles() {
    const { disabled } = this.props;

    return StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: getColor('layer01'),
        borderBottomColor: getColor('borderSubtle01'),
        borderBottomWidth: 1,
        minHeight: 48,
        paddingRight: 14,
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
    });
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

  render(): React.ReactNode {
    const { text, disabled, onLongPress, componentProps, style, leftIcon, rightIcon, hasChevron, lastItem } = this.props;
    const finalStyle = styleReferenceBreaker(this.styles.wrapper);

    if (lastItem) {
      finalStyle.borderBottomWidth = 0;
    }

    return (
      <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, styleReferenceBreaker(finalStyle, style))} accessibilityLabel={text} accessibilityRole="button" onPress={this.onPress} onLongPress={onLongPress} {...(componentProps || {})}>
        {!!leftIcon && <View style={this.styles.leftIcon}>{createIcon(leftIcon, 20, 20, this.textIconColor)}</View>}
        {this.contentArea}
        {!!rightIcon && <View style={this.styles.rightIcon}>{createIcon(rightIcon, 20, 20, this.textIconColor)}</View>}
        {!!hasChevron && <View style={this.styles.chevronIcon}>{createIcon(ChevronRightIcon, 20, 20, this.textIconColor)}</View>}
      </Pressable>
    );
  }
}
