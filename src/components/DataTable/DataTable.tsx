import React from 'react';
import { StyleProp, StyleSheet, ViewStyle, View, ViewProps } from 'react-native';
import { styleReferenceBreaker } from '../../helpers';

export type DataTableProps = {
  /** Content of the row. Should be list of <DataTableHeader /> or <DataTableRow. */
  children: React.ReactNode;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
}


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
    const {componentProps, style, children} = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    return <View style={finalStyles} {...(componentProps || {})}>{children}</View>;
  }
}
