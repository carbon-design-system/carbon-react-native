import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, GestureResponderEvent, Pressable, TextStyle, View } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, styleReferenceBreaker } from '../../helpers';
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
  /** Nested items to render */
  children?: UiPanelNestedItem[];
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

  private get styles() {
    const { open } = this.state;

    return StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: open ? getColor('backgroundSelected') : getColor('layer01'),
        borderLeftColor: open ? getColor('borderInteractive') : getColor('layer01'),
        borderLeftWidth: 4,
        height: 48,
        paddingRight: 16,
      },
      textWrapper: {
        flex: 1,
        paddingLeft: 14,
      },
      leftIcon: {
        paddingRight: 14,
        paddingLeft: 14,
      },
      rightIcon: {
        paddingLeft: 14,
      },
      nestedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: getColor('layer01'),
        height: 48,
        paddingRight: 16,
      },
    });
  }

  private itemColor = (disableNestedItem?: boolean): string => {
    const { open } = this.state;
    const { disabled } = this.props;

    if (disabled || disableNestedItem) {
      return getColor('textDisabled');
    } else {
      return open ? getColor('textPrimary') : getColor('textSecondary');
    }
  };

  private get textStyle(): StyleProp<TextStyle> {
    const finalStyle: any = {
      color: this.itemColor(),
    };

    return StyleSheet.create(finalStyle);
  }

  private toggleNav = (): void => {
    const { open } = this.state;
    const { children } = this.props;

    if (children?.length) {
      this.setState({ open: !open });
    }
  };

  private get nestedItems(): React.ReactNode {
    const { children, leftIcon } = this.props;

    return children
      ?.filter((item) => !item.hidden)
      .map((item, index) => {
        const finalStyle: any = {
          color: this.itemColor(item.disabled),
          paddingLeft: leftIcon ? 88 : 40,
        };

        const textStyle = StyleSheet.create(finalStyle);

        return (
          <Pressable key={index} style={styleReferenceBreaker(this.styles.nestedItem, item.style)} accessibilityRole="button" accessibilityLabel={item.text} onPress={item.onPress} onLongPress={item.onLongPress} disabled={item.disabled} {...(item.componentProps || {})}>
            <View style={this.styles.textWrapper}>
              <Text breakMode={item.textBreakMode} type="body-compact-01" style={textStyle} text={item.text} />
            </View>
            {!!item.rightIcon && <View style={this.styles.rightIcon}>{createIcon(item.rightIcon, 20, 20, this.itemColor(item.disabled))}</View>}
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
    const { text, textBreakMode, leftIcon, disabled, children, componentProps, style } = this.props;

    return (
      <View>
        <Pressable style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="button" accessibilityLabel={text} onPress={this.toggleNav} disabled={disabled} {...(componentProps || {})}>
          {!!leftIcon && <View style={this.styles.leftIcon}>{createIcon(leftIcon, 20, 20, this.itemColor())}</View>}
          <View style={this.styles.textWrapper}>
            <Text breakMode={textBreakMode} type="heading-compact-01" style={this.textStyle} text={text} />
          </View>
          {!!children?.length && <View style={this.styles.rightIcon}>{createIcon(open ? ChevronUpIcon : ChevronDownIcon, 20, 20, this.itemColor())}</View>}
        </Pressable>
        {open && children && this.nestedItems}
      </View>
    );
  }
}
