import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { MenuItem, MenuItemProps } from '../MenuItem';

export type MenuProps = {
  /** Items to render in the menu */
  menuItems: MenuItemProps[];
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
}

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: 280,
    backgroundColor: getColor('layer01'),
  },
});

export class Menu extends React.Component<MenuProps> {
  render(): React.ReactNode {
    const {menuItems, componentProps, style} = this.props;

    return (
      <ScrollView bounces={false} style={styleReferenceBreaker(styles.wrapper, style)} accessibilityRole="menu" {...(componentProps || {})}>
        {(menuItems || []).map((item, index) => <MenuItem key={index} {...item} />)}
      </ScrollView>
    );
  }
}
