import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, Pressable, ScrollView } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { Text } from '../Text';

export type TabItem = {
  /** Text to render */
  text: string;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Any additional data needed to store for the callback */
  data?: unknown;
}

export type TabsProps = {
  /** Items to render in the tabs */
  items: TabItem[];
  /** Callback when switcher is changed */
  onChange?: (index: number, item: TabItem) => void;
  /** Selected index */
  selectedIndex?: number;
  /** Indicate if scroll mode should be used (when several tabs that will not fit this should be true) */
  scrollMode?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
}

export class Tabs extends React.Component<TabsProps> {
  state = {
    currentIndex: 0,
  }

  private get styles() {
    const basicStyle = {
      padding: 16,
      paddingTop: 11,
      paddingBottom: 11,
      flex: 1,
      borderBottomWidth: 3,
      borderBottomColor: getColor('layer01'),
    };

    return StyleSheet.create({
      scrollWrapper: {
        // Space for scrollbar
        paddingBottom: 16,
        flexGrow: 1,
      },
      wrapper: {
        minHeight: 48,
        flexDirection: 'row',
        width: '100%',
      },
      item: {
        ...basicStyle,
        backgroundColor: getColor('layer01'),
      },
    });
  }

  private changeItem = (item: TabItem, index: number): void => {
    const {onChange} = this.props;
    this.setState({currentIndex: index}, () => {
      if (typeof onChange === 'function') {
        onChange(index, item);
      }
    });

  }

  private getTab(item: TabItem, index: number): React.ReactNode {
    const {currentIndex} = this.state;
    const active = index === currentIndex;
    const finalStyle = styleReferenceBreaker(this.styles.item);
    const textStyle = {color: active ? getColor('textPrimary') : getColor('textSecondary')}

    if (item.disabled) {
      textStyle.color = getColor('textDisabled');
    }

    if (active) {
      finalStyle.borderBottomColor = getColor('interactive');
    }

    return (
      <Pressable key={index} disabled={item.disabled} onPress={() => this.changeItem(item, index)} style={finalStyle} accessibilityLabel={item.text} accessibilityRole="tab">
        <Text type={active ? 'heading-compact-01' : 'body-compact-01'} style={textStyle} breakMode="tail" text={item.text} />
      </Pressable>
    )
  }

  componentDidUpdate(previousProps: TabsProps): void {
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
    const {items, componentProps, style, scrollMode} = this.props;
    const content = (items || []).map((item, index) => this.getTab(item, index));

    if (scrollMode) {
      return (
        <ScrollView contentContainerStyle={this.styles.scrollWrapper} bounces={false} horizontal={true} style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="tablist" {...(componentProps || {})}>
          {content}
        </ScrollView>
      );
    }

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="tablist" {...(componentProps || {})}>
        {content}
      </View>
    );
  }
}
