import React from 'react';
import { StyleSheet, ScrollView, Alert, ViewStyle } from 'react-native';
import { Button, Checkbox, styleReferenceBreaker } from '@carbon/react-native';
import AddIcon from '@carbon/icons/es/add/20';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  baseSpacing: {
    marginBottom: 16,
  },
});

export default class TestButton extends React.Component {
  state = {
    disabled: false,
    not100: false,
  };

  private alert = (text: string): void => {
    Alert.alert(text);
  };

  render(): React.ReactNode {
    const { disabled, not100 } = this.state;
    const itemStyle: ViewStyle = styleReferenceBreaker(styles.baseSpacing);

    if (not100) itemStyle.alignSelf = 'flex-start';

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Checkbox checked={not100} id="not100" onPress={(value) => this.setState({ not100: value })} label="Use flex-start align" />
        <Checkbox checked={disabled} id="disabled" onPress={(value) => this.setState({ disabled: value })} label="Disabled" />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Default"
          onPress={() => {
            this.alert('Pressed default');
          }}
          onLongPress={() => {
            this.alert('Long pressed default');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Primary"
          kind="primary"
          onPress={() => {
            this.alert('Pressed primary');
          }}
          onLongPress={() => {
            this.alert('Long pressed primary');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Secondary"
          kind="secondary"
          onPress={() => {
            this.alert('Pressed secondary');
          }}
          onLongPress={() => {
            this.alert('Long pressed secondary');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Tertiary"
          kind="tertiary"
          onPress={() => {
            this.alert('Pressed tertiary');
          }}
          onLongPress={() => {
            this.alert('Long pressed tertiary');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Ghost"
          kind="ghost"
          onPress={() => {
            this.alert('Pressed ghost');
          }}
          onLongPress={() => {
            this.alert('Long pressed ghost');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Danger Tertiary"
          kind="danger-tertiary"
          onPress={() => {
            this.alert('Pressed danger');
          }}
          onLongPress={() => {
            this.alert('Long pressed danger');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Danger Ghost"
          kind="danger-ghost"
          onPress={() => {
            this.alert('Pressed danger');
          }}
          onLongPress={() => {
            this.alert('Long pressed danger');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Danger"
          kind="danger"
          onPress={() => {
            this.alert('Pressed danger');
          }}
          onLongPress={() => {
            this.alert('Long pressed danger');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          breakMode="wrap"
          text="Long text that will need to wrap or ellipsis. See checkbox above."
          onPress={() => {
            this.alert('Pressed long text');
          }}
          onLongPress={() => {
            this.alert('Long pressed long text');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Icon only mode"
          iconOnlyMode={true}
          kind="primary"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Icon only mode"
          iconOnlyMode={true}
          kind="secondary"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Icon only mode"
          iconOnlyMode={true}
          kind="tertiary"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Icon only mode"
          iconOnlyMode={true}
          kind="ghost"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Icon only mode"
          iconOnlyMode={true}
          kind="danger-tertiary"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Icon only mode"
          iconOnlyMode={true}
          kind="danger-ghost"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          text="Icon only mode"
          iconOnlyMode={true}
          kind="danger"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="primary"
          text="With icon"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="secondary"
          text="With icon"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="tertiary"
          text="With icon"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="ghost"
          text="With icon"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="danger-tertiary"
          text="With icon"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="danger-ghost"
          text="With icon"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="danger"
          text="With icon"
          icon={AddIcon}
          onPress={() => {
            this.alert('Pressed icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          breakMode="wrap"
          icon={AddIcon}
          text="Long text with icon that will need to wrap or ellipsis. See checkbox above."
          onPress={() => {
            this.alert('Pressed long text with icon');
          }}
          onLongPress={() => {
            this.alert('Long pressed long text with icon');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="high-contrast"
          icon={AddIcon}
          text="High contrast"
          onPress={() => {
            this.alert('Pressed high contrast');
          }}
          onLongPress={() => {
            this.alert('Long pressed high contrast');
          }}
        />
        <Button
          style={itemStyle}
          disabled={disabled}
          kind="high-contrast-inverse"
          icon={AddIcon}
          text="High contrast inverse"
          onPress={() => {
            this.alert('Pressed high contrast inverse');
          }}
          onLongPress={() => {
            this.alert('Long pressed high contrast inverse');
          }}
        />
      </ScrollView>
    );
  }
}
