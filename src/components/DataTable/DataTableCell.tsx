import React from 'react';
import { StyleProp, StyleSheet, ViewStyle, GestureResponderEvent, Pressable, ViewProps, View } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { Text, TextBreakModes } from '../Text';

export type DataTableCellProps = {
  /** Content of the cell. If string will format accordingly. If Node will not be styled. */
  content: React.ReactNode | string;
  /** Type of cell (default is default) */
  type?: 'default' | 'header';
  /** Width to set. Be sure to set width of header and corresponding cell to same. Defaults to fill. */
  width?: number;
  /** Break mode used on string type content (default is tail) */
  breakMode?: TextBreakModes;
  /** onPress event for the cell */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event for the cell */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Text to use for cell (accessibility). Not set by default. May not be required if cell only includes text */
  cellText?: string;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class DataTableCell extends React.Component<DataTableCellProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        height: 48,
        backgroundColor: getColor('layer01'),
        padding: 16,
        paddingBottom: 15,
        paddingTop: 15,
        flex: 1,
      },
    });
  }

  private get content(): React.ReactNode {
    const { content, type, breakMode } = this.props;

    if (typeof content === 'string') {
      switch (type) {
        case 'header':
          return <Text type="heading-compact-01" text={content} breakMode={breakMode || 'tail'} />;
        case 'default':
        default:
          return <Text type="body-compact-01" text={content} breakMode={breakMode || 'tail'} />;
      }
    } else {
      return content;
    }
  }

  render(): React.ReactNode {
    const { componentProps, style, type, onPress, onLongPress, cellText, content, width } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    if (type === 'header') {
      finalStyles.backgroundColor = getColor('layerAccent01');
    }

    finalStyles.maxWidth = width;

    const finalProps = {
      style: finalStyles,
      ...(componentProps || {}),
      onPress: onPress,
      onLongPress: onLongPress,
      accessibilityLabel: cellText || typeof content === 'string' ? String(content) : undefined,
    };

    if (typeof onPress === 'function' || typeof onLongPress === 'function') {
      return <Pressable {...finalProps}>{this.content}</Pressable>;
    } else {
      return <View {...finalProps}>{this.content}</View>;
    }
  }
}
