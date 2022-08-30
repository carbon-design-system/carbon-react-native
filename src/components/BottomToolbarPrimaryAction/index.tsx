import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, GestureResponderEvent, Pressable, PressableStateCallbackType } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import type { ToolbarButton } from '../../types/navigation';
import { Button } from '../Button';
import { Link } from '../Link';
import type { CarbonIcon } from '../../types/shared';

export type BottomToolbarPrimaryActionProps = {
  /** Position of primary action (default is center) */
  position?: 'center' | 'right' | 'left';
  /** Icon to load for the primary action (size 24) */
  icon: CarbonIcon;
  /** Text to use to describe the primary action (for accessibility) */
  text: string;
  /** Indicate if primary action is disabled */
  disabled?: boolean;
  /** onPress event for primary button item */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event for primary button item */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Toolbar items to load for left side. Not used for positon left. (alignment property is not respected in this view) */
  leftItems?: ToolbarButton[];
  /** Toolbar items to load for right side. Not used for positon right. (alignment property is not respected in this view) */
  rightItems?: ToolbarButton[];
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class BottomToolbarPrimaryAction extends React.Component<BottomToolbarPrimaryActionProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        height: 48,
        maxHeight: 48,
        width: '100%',
        backgroundColor: getColor('layer01'),
        flexDirection: 'row',
        position: 'relative',
        borderTopColor: getColor('borderSubtle01'),
        borderTopWidth: 1,
      },
      itemWrapper: {
        flex: 1,
        flexDirection: 'row',
      },
      primaryAction: {
        marginRight: 16,
        marginLeft: 16,
        width: 56,
        height: 56,
        backgroundColor: getColor('buttonPrimary'),
        padding: 16,
        borderRadius: 56,
        marginTop: -28,
      },
      itemTextStyle: {
        flex: 1,
      },
      itemIconStyle: {
        width: 48,
      },
      linkStyle: {
        padding: 13,
      },
    });
  }

  private getItems(items: ToolbarButton[], type: 'right' | 'left'): React.ReactNode {
    const finalWrapperStyles = styleReferenceBreaker(this.styles.itemWrapper);

    if (type === 'right') {
      finalWrapperStyles.justifyContent = 'flex-end';
    } else if (type === 'left') {
      finalWrapperStyles.justifyContent = 'flex-start';
    }

    return (
      <View style={finalWrapperStyles}>
        {items.map((item, index) => {
          const iconMode = !!item.icon;
          const finalStyles = styleReferenceBreaker(iconMode ? this.styles.itemIconStyle : this.styles.itemTextStyle, item.style);
          let finalColor = getColor('iconPrimary');

          if (item.disabled) {
            finalColor = getColor('iconDisabled');
          }

          return (
            <View style={finalStyles} key={index}>
              {iconMode ? <Button kind="ghost" overrideColor={finalColor} disabled={item.disabled} icon={item.icon} iconOnlyMode={true} text={item.text} onPress={item.onPress} onLongPress={item.onLongPress} /> : <Link style={this.styles.linkStyle} disabled={item.disabled} textStyle={{ textAlign: item.alignItem || 'center' }} textType={item.textType} text={item.text} onPress={item.onPress} onLongPress={item.onLongPress} />}
            </View>
          );
        })}
      </View>
    );
  }

  private get primaryAction(): React.ReactNode {
    const { disabled, icon, text, onPress, onLongPress } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.primaryAction);
    const getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
      return state.pressed ? { backgroundColor: getColor('buttonPrimaryActive') } : undefined;
    };

    if (disabled) {
      finalStyles.backgroundColor = getColor('buttonDisabled');
    }

    return (
      <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, finalStyles, getStateStyle)} onPress={onPress} onLongPress={onLongPress} accessibilityLabel={text} accessibilityRole="button">
        {createIcon(icon, 24, 24, getColor(disabled ? 'textOnColorDisabled' : 'textOnColor'))}
      </Pressable>
    );
  }

  private get mainView(): React.ReactNode {
    const { position, leftItems, rightItems } = this.props;

    switch (position) {
      case 'left':
        return (
          <>
            {this.primaryAction}
            {this.getItems(rightItems || [], 'right')}
          </>
        );
      case 'right':
        return (
          <>
            {this.getItems(leftItems || [], 'left')}
            {this.primaryAction}
          </>
        );
      case 'center':
      default:
        return (
          <>
            {this.getItems(leftItems || [], 'left')}
            {this.primaryAction}
            {this.getItems(rightItems || [], 'right')}
          </>
        );
    }
  }

  render(): React.ReactNode {
    const { componentProps, style } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    return (
      <View style={finalStyles} accessibilityRole="toolbar" {...(componentProps || {})}>
        {this.mainView}
      </View>
    );
  }
}
