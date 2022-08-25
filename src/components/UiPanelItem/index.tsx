import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, GestureResponderEvent, Pressable, View } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { Text, TextBreakModes, TextTypes } from '../Text';
import ChevronDownIcon from '@carbon/icons/es/chevron--down/20';
import ChevronUpIcon from '@carbon/icons/es/chevron--up/20';
import type { CarbonIcon } from 'src/types/shared';

export type UiPanelNestedItem = {
  /** Name of the navigation item to render */
  text: string;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Text type to render (Standard is default.  Normally only body 01 or 02 should be used)  */
  textType?: TextTypes;
  /** Left icon to render (size 20) */
  leftIcon?: CarbonIcon;
  /** Right icon to render (size 20) */
  rightIcon?: CarbonIcon;
  /** onPress event */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if the item should be hidden */
  hidden?: boolean;
  /** Indicate if the item should be disabled */
  disabled?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export type UiPanelItemProps = {
  /** Name of the item to render */
  text: string;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Text type to render (Standard is default.  Normally only body 01 or 02 should be used)  */
  textType?: TextTypes;
  /** Left icon to render (size 20) */
  leftIcon?: CarbonIcon;
  /** Right icon to render (size 20) */
  rightIcon?: CarbonIcon;
  /** Nested items to render */
  children?: UiPanelNestedItem[];
  /** onPress event */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Callback when item pressed with no children */
  noChildrenPressCallback?: () => void;
  /** Indicate if the item should be expanded on page load */
  openOnLoad?: boolean;
  /** Indicate if the item should be hidden */
  hidden?: boolean;
  /** Indicate if the item should be disabled */
  disabled?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class UiPanelItem extends React.Component<UiPanelItemProps> {
  state = {
    open: false,
  };

  private itemColor(forceDisabled?: boolean): string {
    const { open } = this.state;
    const { disabled } = this.props;

    if (disabled || forceDisabled) {
      return getColor('textDisabled');
    } else {
      return open ? getColor('textPrimary') : getColor('textSecondary');
    }
  }

  private get styles() {
    const { open } = this.state;

    return StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: open ? getColor('backgroundSelected') : undefined,
        minHeight: 48,
      },
      primaryText: {
        color: this.itemColor(),
        flex: 1,
        padding: 16,
        paddingTop: 13,
        paddingBottom: 13,
      },
      childText: {
        color: this.itemColor(),
        flex: 1,
        padding: 16,
        paddingTop: 13,
        paddingBottom: 13,
      },
      icon: {
        padding: 14,
      },
      openIndicator: {
        width: 4,
        backgroundColor: getColor('borderInteractive'),
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
      },
      nestedItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        minHeight: 48,
      },
    });
  }

  private pressParent = (event: GestureResponderEvent): void => {
    const { open } = this.state;
    const { children, onPress, noChildrenPressCallback } = this.props;

    if (typeof onPress === 'function') {
      onPress(event);
    }

    if (children?.length) {
      this.setState({ open: !open });
    } else if (typeof noChildrenPressCallback === 'function') {
      noChildrenPressCallback();
    }
  };

  private get nestedItems(): React.ReactNode {
    const { children, noChildrenPressCallback } = this.props;

    return children
      ?.filter((item) => !item.hidden)
      .map((item, index) => {
        const finalTextStyle = styleReferenceBreaker(this.styles.childText);
        const finalStyle = styleReferenceBreaker(this.styles.nestedItem);

        finalStyle.paddingLeft = item.leftIcon ? 40 : 88;

        if (item.disabled) {
          finalTextStyle.color = getColor('textDisabled');
        }

        const onPress = (event: GestureResponderEvent): void => {
          if (typeof item.onPress === 'function') {
            item.onPress(event);
          }

          if (typeof noChildrenPressCallback === 'function') {
            noChildrenPressCallback();
          }
        };

        return (
          <Pressable key={index} style={(state) => pressableFeedbackStyle(state, styleReferenceBreaker(finalStyle, item.style))} accessibilityRole="button" accessibilityLabel={item.text} onPress={onPress} onLongPress={item.onLongPress} disabled={item.disabled} {...(item.componentProps || {})}>
            {!!item.leftIcon && <View style={this.styles.icon}>{createIcon(item.leftIcon, 20, 20, this.itemColor(item.disabled))}</View>}
            <Text breakMode={item.textBreakMode} style={finalTextStyle} text={item.text} />
            {!!item.rightIcon && <View style={this.styles.icon}>{createIcon(item.rightIcon, 20, 20, this.itemColor(item.disabled))}</View>}
          </Pressable>
        );
      });
  }

  componentDidMount(): void {
    const { openOnLoad, children } = this.props;

    if (openOnLoad && !!children?.length) {
      this.setState({ open: true });
    }
  }

  render(): React.ReactNode {
    const { open } = this.state;
    const { text, textBreakMode, leftIcon, disabled, children, componentProps, style, rightIcon, onLongPress } = this.props;

    return (
      <View>
        <Pressable style={(state) => pressableFeedbackStyle(state, styleReferenceBreaker(this.styles.wrapper, style))} accessibilityRole="button" accessibilityLabel={text} onPress={this.pressParent} onLongPress={onLongPress} disabled={disabled} {...(componentProps || {})}>
          {open && <View style={this.styles.openIndicator} />}
          {!!leftIcon && <View style={this.styles.icon}>{createIcon(leftIcon, 20, 20, this.itemColor())}</View>}
          <Text breakMode={textBreakMode} type="heading-compact-02" style={this.styles.primaryText} text={text} />
          {!!rightIcon && <View style={this.styles.icon}>{createIcon(rightIcon, 20, 20, this.itemColor())}</View>}
          {!!children?.length && <View style={this.styles.icon}>{createIcon(open ? ChevronUpIcon : ChevronDownIcon, 20, 20, this.itemColor())}</View>}
        </Pressable>
        {open && children && this.nestedItems}
      </View>
    );
  }
}
