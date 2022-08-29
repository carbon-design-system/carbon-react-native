import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { MenuItem, MenuItemProps } from '../MenuItem';

export type MenuProps = {
  /** Items to render in the menu */
  items: MenuItemProps[];
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class Menu extends React.Component<MenuProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        maxHeight: 280,
        backgroundColor: getColor('layer01'),
      },
    });
  }

  render(): React.ReactNode {
    const { items, componentProps, style } = this.props;

    return (
      <ScrollView bounces={false} style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="menu" {...(componentProps || {})}>
        {(items || []).map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </ScrollView>
    );
  }
}
