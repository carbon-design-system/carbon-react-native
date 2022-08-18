import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTableCell, DataTableRow, DataTableHeader, DataTableHeaderProps, DataTable } from 'carbon-react-native';
import ArrowRightIcon from '@carbon/icons/es/arrow--right/20';
import SearchIcon from '@carbon/icons/es/search/20';
import SettingsIcon from '@carbon/icons/es/settings/20';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
});

export default class TestDataTable extends React.Component {
  private alert = (text: string): void => {
    Alert.alert(text);
  };

  private get dataTableHeaderProps(): DataTableHeaderProps {
    return {
      primaryAction: {
        kind: 'primary',
        text: 'Primary button',
        icon: ArrowRightIcon,
        onPress: () => this.alert('Pressed primary button'),
      },
      secondaryActions: [
        {
          text: 'Search',
          icon: SearchIcon,
          iconOnlyMode: true,
          onPress: () => this.alert('Pressed search button'),
        },
        {
          text: 'Settings',
          icon: SettingsIcon,
          iconOnlyMode: true,
          onPress: () => this.alert('Pressed settings button'),
        },
      ],
    };
  }

  render(): React.ReactNode {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <DataTable>
          <DataTableHeader {...this.dataTableHeaderProps} />
          <DataTableRow>
            <DataTableCell type="header" content="Name" />
            <DataTableCell type="header" content="Birthday" width={100} />
          </DataTableRow>
          <DataTableRow onPress={() => this.alert('Pressed row 1')}>
            <DataTableCell content="John Smith" />
            <DataTableCell content="1/2/1968" width={100} />
          </DataTableRow>
          <DataTableRow>
            <DataTableCell onPress={() => this.alert('Pressed long name cell')} content="Jack Long name that is going to be too big for screen" />
            <DataTableCell content="3/4/1985" width={100} />
          </DataTableRow>
          <DataTableRow onPress={() => this.alert('Pressed row 3')}>
            <DataTableCell content="Jane Smith" />
            <DataTableCell content="3/24/1999" width={100} />
          </DataTableRow>
        </DataTable>
      </ScrollView>
    );
  }
}
