import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTableCell, DataTableRow, DataTableHeader, DataTableHeaderProps, DataTable, Checkbox, DataTableHeaderSelected, Text } from '@carbon/react-native';
import AddIcon from '@carbon/icons/es/add/20';
import SearchIcon from '@carbon/icons/es/search/20';
import SettingsIcon from '@carbon/icons/es/settings/20';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    paddingTop: 32,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  checkbox: {
    justifyContent: 'center',
  },
});

export default class TestDataTable extends React.Component {
  state = {
    checked1: false,
    checked2: false,
    checked3: false,
  };

  private alert = (text: string): void => {
    Alert.alert(text);
  };

  private get dataTableHeaderProps(): DataTableHeaderProps {
    return {
      primaryAction: {
        kind: 'primary',
        text: 'Primary button',
        icon: AddIcon,
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
    const { checked1, checked2, checked3 } = this.state;

    const checkedCount = (checked1 ? 1 : 0) + (checked2 ? 1 : 0) + (checked3 ? 1 : 0);

    const cancel = () => {
      this.setState({ checked1: false, checked2: false, checked3: false });
    };

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <DataTable>
          {checkedCount ? (
            <DataTableHeaderSelected
              onCancel={cancel}
              cancelText="Cancel"
              itemsSelectedText={`${checkedCount === 1 ? '1 item selected' : `${checkedCount} items selected`}`}
              actions={[
                { kind: 'primary', onPress: () => this.alert('Action1 pressed'), text: 'Action1' },
                { kind: 'primary', onPress: () => this.alert('Action2 pressed'), text: 'Action2' },
                { kind: 'primary', onPress: () => this.alert('Action3 pressed'), text: 'Action3' },
              ]}
            />
          ) : (
            <DataTableHeader {...this.dataTableHeaderProps} />
          )}
          <DataTableRow>
            <DataTableCell type="header" content="" width={48} />
            <DataTableCell type="header" content="Name" />
            <DataTableCell type="header" content="Birthday" width={100} />
          </DataTableRow>
          <DataTableRow onPress={() => this.alert('Pressed row 1')}>
            <DataTableCell noPadding={true} width={48} content={<Checkbox style={styles.checkbox} hideLabel={true} label="Checkbox row 1" id="checkbox-1" onPress={(value) => this.setState({ checked1: value })} checked={checked1} />} />
            <DataTableCell content="John Smith" />
            <DataTableCell content="1/2/1968" width={100} />
          </DataTableRow>
          <DataTableRow>
            <DataTableCell noPadding={true} width={48} content={<Checkbox style={styles.checkbox} hideLabel={true} label="Checkbox row 2" id="checkbox-2" onPress={(value) => this.setState({ checked2: value })} checked={checked2} />} />
            <DataTableCell onPress={() => this.alert('Pressed long name cell')} content={<Text text="Testing larger text" type="heading-03" />} />
            <DataTableCell content="3/4/1985" width={100} />
          </DataTableRow>
          <DataTableRow onPress={() => this.alert('Pressed row 3')}>
            <DataTableCell noPadding={true} width={48} content={<Checkbox style={styles.checkbox} hideLabel={true} label="Checkbox row 3" id="checkbox-3" onPress={(value) => this.setState({ checked3: value })} checked={checked3} />} />
            <DataTableCell content="Jane Smith" />
            <DataTableCell content="3/24/1999" width={100} />
          </DataTableRow>
        </DataTable>
      </ScrollView>
    );
  }
}
