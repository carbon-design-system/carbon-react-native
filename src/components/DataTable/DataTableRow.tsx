import React from 'react';
import { StyleProp, StyleSheet, ViewStyle, GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import { pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';

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
  componentProps?: PressableProps;
};

export class DataTableRow extends React.Component<DataTableRowProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        backgroundColor: 'red',
        maxHeight: 48,
        height: 48,
        flexDirection: 'row',
        width: '100%',
      },
    });
  }
  render(): React.ReactNode {
    const { componentProps, style, onPress, onLongPress, rowText, children } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    return (
      <Pressable style={(state) => pressableFeedbackStyle(state, finalStyles)} {...(componentProps || {})} onPress={onPress} onLongPress={onLongPress} accessibilityLabel={rowText}>
        {children}
      </Pressable>
    );
  }
}
