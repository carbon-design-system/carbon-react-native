import React from 'react';
import { StyleProp, StyleSheet, ViewStyle, GestureResponderEvent, Pressable, ViewProps, View, PressableStateCallbackType } from 'react-native';
import { getColor } from '../../styles/colors';
import { pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';

/** Props for DataTableRow component */
export type DataTableRowProps = {
  /** Content of the row. Should be list of <DataTableCell />. */
  children: React.ReactNode;
  /** onPress event for the row (ignored if DataTableCell has press events) */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event for the row (ignored if DataTableCell has press events) */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Text to use for row (accessibility). Not set by default. */
  rowText?: string;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * DataTableRow component for rendering a data table row.
 * Used as a child of DataTable
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/DataTable.tsx | Example code}
 */
export class DataTableRow extends React.Component<DataTableRowProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        backgroundColor: getColor('layer01'),
        minHeight: 48,
        flexDirection: 'row',
        width: '100%',
        borderTopColor: getColor('borderSubtle00'),
        borderTopWidth: 1,
      },
    });
  }

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  render(): React.ReactNode {
    const { componentProps, style, onPress, onLongPress, rowText, children } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    if (onPress || onLongPress) {
      return (
        <Pressable style={(state) => pressableFeedbackStyle(state, finalStyles, this.getStateStyle)} {...(componentProps || {})} onPress={onPress} onLongPress={onLongPress} accessibilityLabel={rowText}>
          {children}
        </Pressable>
      );
    } else {
      return (
        <View style={finalStyles} {...(componentProps || {})} accessibilityLabel={rowText}>
          {children}
        </View>
      );
    }
  }
}
