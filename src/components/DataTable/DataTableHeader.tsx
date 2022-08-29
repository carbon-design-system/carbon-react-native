import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, ScrollView } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { Button, ButtonProps } from '../Button';

export type DataTableHeaderProps = {
  /** Primary action to render (right side action) */
  primaryAction?: ButtonProps;
  /** Secondary actions to render (left side action. Should only be icons normally. But not limited). If kind and overrideColor are not set will auto set to best combo for tables. */
  secondaryActions?: ButtonProps[];
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class DataTableHeader extends React.Component<DataTableHeaderProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        height: 48,
        backgroundColor: getColor('layer01'),
        flexDirection: 'row',
      },
      secondaryActions: {
        flexDirection: 'row',
        flex: 1,
      },
    });
  }

  private get secondaryActions(): React.ReactNode {
    const { secondaryActions } = this.props;

    return (
      <ScrollView bounces={false} horizontal={true} style={this.styles.secondaryActions}>
        {(secondaryActions || []).map((item, index) => {
          return <Button key={index} {...item} overrideColor={item.overrideColor || getColor('iconPrimary')} kind={item.kind || 'ghost'} />;
        })}
      </ScrollView>
    );
  }

  private get primaryAction(): React.ReactNode {
    const { primaryAction } = this.props;

    if (primaryAction) {
      return <Button {...primaryAction} />;
    }

    return null;
  }

  render(): React.ReactNode {
    const { componentProps, style } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    return (
      <View style={finalStyles} {...(componentProps || {})} accessibilityRole="menubar">
        {this.secondaryActions}
        {this.primaryAction}
      </View>
    );
  }
}
