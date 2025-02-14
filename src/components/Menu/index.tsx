import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { getColor } from '../../styles/colors';
import { MenuItem, MenuItemProps } from '../MenuItem';

/** Props for Menu component */
export type MenuProps = {
  /** Items to render in the menu */
  items: MenuItemProps[];
  /** Height in pixels to max out the menu (defaults to 280) */
  maxMenuHeight?: number;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * Menu component for rendering a menu (list of clickable options)
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Menu.tsx | Example code}
 */

export class Menu extends React.Component<MenuProps> {
  private get styles() {
    const { maxMenuHeight } = this.props;

    return StyleSheet.create({
      wrapper: {
        maxHeight: maxMenuHeight || 280,
        backgroundColor: getColor('layer01'),
      },
    });
  }

  render() {
    const { items, componentProps, style } = this.props;
    const finalItems = items || [];

    return (
      <ScrollView bounces={false} style={[this.styles.wrapper, style]} accessibilityRole="menu" {...(componentProps || {})}>
        {finalItems.map((item, index) => (
          <MenuItem key={index} {...item} lastItem={index === finalItems.length - 1} />
        ))}
      </ScrollView>
    );
  }
}
