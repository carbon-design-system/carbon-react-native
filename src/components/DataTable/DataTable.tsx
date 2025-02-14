import React from 'react';
import { StyleProp, StyleSheet, ViewStyle, View, ViewProps } from 'react-native';

/** Props for DataTable component */
export type DataTableProps = {
  /** Content of the row. Should be list of DataTableHeader or DataTableRow. */
  children: React.ReactNode;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * DataTable component for rendering a data table.
 * Children components should be DataTableRow, DataTableCell, DataTableHeader, DataTableHeaderSelected
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/DataTable.tsx | Example code}
 */
export class DataTable extends React.Component<DataTableProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        alignContent: 'flex-start',
      },
    });
  }
  render(): React.ReactNode {
    const { componentProps, style, children } = this.props;
    const finalStyles = StyleSheet.flatten([this.styles.wrapper, style]);

    return (
      <View style={finalStyles} {...(componentProps || {})}>
        {children}
      </View>
    );
  }
}
