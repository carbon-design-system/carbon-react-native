import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, Pressable, PressableStateCallbackType } from 'react-native';
import { getColor } from '../../styles/colors';
import { pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { Text, TextTypes } from '../Text';

export type SwitcherItem = {
  /** Text to render */
  text: string;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Text type to render (Default is body-compact-01)  */
  textType?: TextTypes;
  /** Any additional data needed to store for the callback */
  data?: unknown;
};

export type ContentSwitcherProps = {
  /** Items to render in the content switcher (should try and keep under 3. Anything larger gets hard to read on mobile) */
  items: SwitcherItem[];
  /** Callback when switcher is changed */
  onChange?: (index: number, item: SwitcherItem) => void;
  /** Selected index */
  selectedIndex?: number;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class ContentSwitcher extends React.Component<ContentSwitcherProps> {
  state = {
    currentIndex: 0,
  };

  private get styles() {
    const basicStyle = {
      padding: 16,
      paddingTop: 14,
      paddingBottom: 14,
      flex: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      position: 'relative' as const,
    };

    return StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
      },
      item: {
        ...basicStyle,
        backgroundColor: 'transparent',
        borderColor: getColor('borderInverse'),
      },
      selectedItem: {
        ...basicStyle,
        backgroundColor: getColor('layerSelectedInverse'),
        borderColor: getColor('layerSelectedInverse'),
      },
      divider: {
        backgroundColor: getColor('borderSubtle01'),
        width: 1,
        height: 16,
        position: 'absolute',
        top: 16,
        right: 0,
      },
    });
  }

  private changeItem = (item: SwitcherItem, index: number): void => {
    const { onChange } = this.props;
    this.setState({ currentIndex: index }, () => {
      if (typeof onChange === 'function') {
        onChange(index, item);
      }
    });
  };

  private getSwitcher(item: SwitcherItem, index: number): React.ReactNode {
    const { currentIndex } = this.state;
    const { items } = this.props;
    const selected = index === currentIndex;
    const finalItem = items.length === index + 1;
    const finalStyle = styleReferenceBreaker(selected ? this.styles.selectedItem : this.styles.item);
    const textStyle = {
      color: selected ? getColor('textInverse') : getColor('textSecondary'),
    };

    if (item.disabled) {
      if (selected) {
        finalStyle.backgroundColor = getColor('buttonDisabled');
      }

      finalStyle.borderColor = getColor('buttonDisabled');
      textStyle.color = getColor('textDisabled');
    }

    if (index === 0) {
      finalStyle.borderLeftWidth = 1;
      finalStyle.borderTopLeftRadius = 4;
      finalStyle.borderBottomLeftRadius = 4;
    }

    if (index === (items || []).length - 1) {
      finalStyle.borderRightWidth = 1;
      finalStyle.borderTopRightRadius = 4;
      finalStyle.borderBottomRightRadius = 4;
    }

    const getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
      return state.pressed
        ? {
            backgroundColor: selected ? getColor('backgroundInverse') : getColor('backgroundActive'),
          }
        : undefined;
    };

    return (
      <Pressable key={index} disabled={item.disabled} onPress={() => this.changeItem(item, index)} style={(state) => pressableFeedbackStyle(state, finalStyle, getStateStyle)} accessibilityLabel={item.text} accessibilityRole="menuitem">
        {!finalItem && !selected && <View style={this.styles.divider} />}
        <Text type={item.textType || 'body-compact-01'} style={textStyle} breakMode="tail" text={item.text} />
      </Pressable>
    );
  }

  componentDidUpdate(previousProps: ContentSwitcherProps): void {
    const { selectedIndex } = this.props;

    if (typeof selectedIndex === 'number' && previousProps.selectedIndex !== selectedIndex) {
      this.setState({ currentIndex: selectedIndex });
    }
  }

  componentDidMount(): void {
    const { selectedIndex } = this.props;

    if (typeof selectedIndex === 'number') {
      this.setState({ currentIndex: selectedIndex });
    }
  }

  render(): React.ReactNode {
    const { items, componentProps, style } = this.props;

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="menu" {...(componentProps || {})}>
        {(items || []).map((item, index) => this.getSwitcher(item, index))}
      </View>
    );
  }
}
