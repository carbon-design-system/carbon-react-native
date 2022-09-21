import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import type { ToolbarButton } from '../../types/navigation';
import { Button } from '../Button';
import { Link } from '../Link';

export type BottomToolbarProps = {
  /** Toolbar items to load */
  items: ToolbarButton[];
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class BottomToolbar extends React.Component<BottomToolbarProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        height: 49,
        maxHeight: 49,
        width: '100%',
        backgroundColor: getColor('layer01'),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopColor: getColor('borderSubtle01'),
        borderTopWidth: 1,
      },
      itemTextStyle: {},
      itemIconStyle: {
        width: 48,
      },
      linkStyle: {
        padding: 13,
      },
    });
  }

  private get items(): React.ReactNode {
    const { items } = this.props;

    return items.map((item, index) => {
      const iconMode = !!item.icon;
      const finalStyles = styleReferenceBreaker(iconMode ? this.styles.itemIconStyle : this.styles.itemTextStyle, item.style);
      let finalColor = getColor('iconPrimary');

      if (item.disabled) {
        finalColor = getColor('iconDisabled');
      }

      switch (item.alignItem) {
        case 'left':
          finalStyles.marginRight = 'auto';
          break;
        case 'right':
          finalStyles.marginLeft = 'auto';
          break;
        case 'center':
        default:
          finalStyles.marginRight = 'auto';
          finalStyles.marginLeft = 'auto';
          break;
      }

      return (
        <View style={finalStyles} key={index}>
          {iconMode ? <Button kind="ghost" overrideColor={finalColor} disabled={item.disabled} icon={item.icon} iconOnlyMode={true} text={item.text} onPress={item.onPress} onLongPress={item.onLongPress} /> : <Link disabled={item.disabled} style={this.styles.linkStyle} textStyle={{ textAlign: item.alignItem || 'center' }} textType={item.textType} text={item.text} onPress={item.onPress} onLongPress={item.onLongPress} />}
        </View>
      );
    });
  }

  render(): React.ReactNode {
    const { componentProps, style } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    return (
      <View style={finalStyles} accessibilityRole="toolbar" {...(componentProps || {})}>
        {this.items}
      </View>
    );
  }
}
