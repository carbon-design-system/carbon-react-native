import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, ScrollView, GestureResponderEvent } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { Button, ButtonProps } from '../Button';
import { Text } from '../Text';

export type DataTableHeaderSelectedProps = {
  /** Text to show for items selected. Normally `X items selected` where X is the number of items checked */
  itemsSelectedText?: string;
  /** Actions to render.  Usually one item is best or you may need to decide how many based on screen size to avoid scroll area being weird. */
  actions?: ButtonProps[];
  /** Cancel button. Should clear selected items. */
  onCancel: (event: GestureResponderEvent) => void;
  /** Cancel text to render for cancel button */
  cancelText: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class DataTableHeaderSelected extends React.Component<DataTableHeaderSelectedProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        height: 48,
        backgroundColor: getColor('backgroundBrand'),
        flexDirection: 'row',
      },
      actions: {
        flexDirection: 'row',
        flex: 1,
      },
      actionsContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'flex-end',
      },
      action: {
        paddingRight: 24,
      },
      itemsSelected: {
        paddingLeft: 16,
        paddingTop: 15,
        paddingBottom: 15,
        color: getColor('textOnColor'),
      },
      cancel: {
        paddingRight: 16,
      },
      cancelWrapper: {
        position: 'relative',
      },
      divider: {
        backgroundColor: getColor('iconOnColor'),
        width: 1,
        height: 16,
        position: 'absolute',
        top: 16,
        left: 0,
      },
    });
  }

  private get actions(): React.ReactNode {
    const { actions } = this.props;

    return (
      <ScrollView bounces={false} horizontal={true} style={this.styles.actions} contentContainerStyle={this.styles.actionsContainer}>
        {(actions || []).map((item, index) => {
          return <Button key={index} {...item} style={this.styles.action} />;
        })}
      </ScrollView>
    );
  }

  private get cancelAction(): React.ReactNode {
    const { onCancel, cancelText } = this.props;

    return (
      <View style={this.styles.cancelWrapper}>
        <Button kind="primary" style={this.styles.cancel} onPress={onCancel} text={cancelText} />
        <View style={this.styles.divider} />
      </View>
    );
  }

  render(): React.ReactNode {
    const { componentProps, style, itemsSelectedText } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    return (
      <View style={finalStyles} {...(componentProps || {})} accessibilityRole="menubar">
        {!!itemsSelectedText && <Text style={this.styles.itemsSelected} text={itemsSelectedText} type="body-compact-01" />}
        {this.actions}
        {this.cancelAction}
      </View>
    );
  }
}
