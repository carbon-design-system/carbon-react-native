import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, Pressable } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { Text, TextBreakModes, TextTypes } from '../Text';

export type SwitcherItem = {
  /** Text to render */
  text: string;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Text type to render (Default is body-compact-01)  */
  textType?: TextTypes;
  /** Any additional data needed to store for the callback */
  data?: unknown;
}

export type ContentSwitcherProps = {
  /** Items to render in the content switcher (should try and keep under 3. Anything larger gets hard to read on mobile) */
  items: SwitcherItem[];
  /** Callback when switcher is changed */
  onChange?: (index: number, item: SwitcherItem) => void;
  /** Selected index */
  selectedIndex?: number;
  /** Indicate if content switcher is used on layer */
  light?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
}

export class ContentSwitcher extends React.Component<ContentSwitcherProps> {
  state = {
    currentIndex: 0,
  }

  private get styles() {
    const {light} = this.props;

    const basicStyle = {
      padding: 16,
      paddingTop: 11,
      paddingBottom: 11,
      flex: 1,
    };

    return StyleSheet.create({
      wrapper: {
        minHeight: 40,
        flexDirection: 'row',
      },
      item: {
        ...basicStyle,
        backgroundColor: getColor('layer03'),
        borderWidth: light ? 1 : undefined,
        borderColor: light ? getColor('backgroundInverse') : undefined,
      },
      activeItem: {
        ...basicStyle,
        backgroundColor: getColor('backgroundInverse'),
      },
    });
  }

  private changeItem = (item: SwitcherItem, index: number): void => {
    const {onChange} = this.props;
    this.setState({currentIndex: index}, () => {
      if (typeof onChange === 'function') {
        onChange(index, item);
      }
    });

  }

  private getSwitcher(item: SwitcherItem, index: number): React.ReactNode {
    const {currentIndex} = this.state;
    const {items} = this.props;
    const active = index === currentIndex;
    const finalStyle = styleReferenceBreaker(active ? this.styles.activeItem : this.styles.item);
    const textStyle = {color: active ? getColor('textInverse') : getColor('textSecondary')}

    if (item.disabled) {
      finalStyle.backgroundColor = getColor('layer02');
      textStyle.color = getColor('textOnColorDisabled');
    }

    if (index === 0) {
      finalStyle.borderTopLeftRadius = 4;
      finalStyle.borderBottomLeftRadius = 4;
    }

    if (index === (items || []).length - 1) {
      finalStyle.borderTopRightRadius = 4;
      finalStyle.borderBottomRightRadius = 4;
    }

    return (
      <Pressable key={index} disabled={item.disabled} onPress={() => this.changeItem(item, index)} style={finalStyle} accessibilityLabel={item.text} accessibilityRole="menuitem">
        <Text type={item.textType || 'body-compact-01'} style={textStyle} breakMode={item.textBreakMode} text={item.text} />
      </Pressable>
    )
  }

  componentDidUpdate(previousProps: ContentSwitcherProps): void {
    const {selectedIndex} = this.props;

    if (typeof selectedIndex === 'number' && previousProps.selectedIndex !== selectedIndex) {
      this.setState({currentIndex: selectedIndex});
    }
  }

  componentDidMount(): void {
    const {selectedIndex} = this.props;

    if (typeof selectedIndex === 'number') {
      this.setState({currentIndex: selectedIndex});
    }
  }

  render(): React.ReactNode {
    const {items, componentProps, style} = this.props;

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="menu" {...(componentProps || {})}>
        {(items || []).map((item, index) => this.getSwitcher(item, index))}
      </View>
    );
  }
}
