import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import { Text, TextTypes } from '../Text';

/** Props for List component */
export type ListProps = {
  /** Type of list (default is unordered) */
  type?: 'unordered' | 'ordered';
  /** Items to render. If strings will apply proper typeface. If passing element you need to set this.styles. */
  items: (string | React.ReactNode)[];
  /** Indicate if list is nested in another list */
  nested?: boolean;
  /** Text type to render (Standard is default.  Normally only body 01 or 02 should be used)  */
  textType?: TextTypes;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * List component for rendering an ordered or unordered list
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/List.tsx | Example code}
 */
export class List extends React.Component<ListProps> {
  private letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  private get styles() {
    return StyleSheet.create({
      itemWrapper: {
        flexDirection: 'row',
        paddingBottom: 4,
      },
      indicator: {
        marginRight: 10,
      },
      content: {
        flex: 1,
      },
    });
  }

  private getIndicator(index: number): React.ReactNode {
    const { type, nested } = this.props;

    if (type === 'ordered') {
      if (nested) {
        let value = this.letters[index % 26] || '?';

        if (index >= 26) {
          const subIndex = Math.floor(index / 26) - 1;
          const subValue = this.letters[subIndex % 26] || '?';

          value = subValue + value;
        }

        return <Text text={value + '.'} />;
      } else {
        return <Text text={String(index + 1) + '.'} />;
      }
    } else {
      if (nested) {
        return <Text text={'\uFFED'} />;
      } else {
        return <Text text={'\u2014'} />;
      }
    }
  }

  private getListItem(item: string | React.ReactNode, index: number): React.ReactNode {
    const { textType } = this.props;

    return (
      <View key={index} style={this.styles.itemWrapper}>
        <View style={this.styles.indicator}>{this.getIndicator(index)}</View>
        <View style={this.styles.content}>{typeof item === 'string' ? <Text type={textType} text={item} /> : item}</View>
      </View>
    );
  }

  render() {
    const { items, componentProps, style } = this.props;

    return (
      <View style={style} {...(componentProps || {})}>
        {items.map((item, index) => this.getListItem(item, index))}
      </View>
    );
  }
}
