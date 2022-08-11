import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { createIcon } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

export type HeaderAction = {
  /** Icon to render (size 20) */
  icon: unknown;
  /** Text to describe icon */
  text: string;
  /** On press event */
  onPress?: () => void;
  /** On long press event */
  onLongPress?: () => void;
};


export type HeaderProps = {
  /** actions to render to the right side */
  actions?: HeaderAction[];
  /** Name to show first */
  mainName: string;
  /** Secondary name to show after mainName (in bold) */
  secondaryName: string;
}

export class Header extends React.Component<HeaderProps> {
  private get styles() {
    return StyleSheet.create({
      header: {
        backgroundColor: getColor('layerSelectedInverse', 'light'),
        borderBottomColor: getColor('backgroundInverse', 'light'),
        borderBottomWidth: 1,
        height: 48,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 0,
      },
      textWrapper: {
        paddingTop: 16,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        minWidth: 1,
      },
      actionWrapper: {
        display: 'flex',
        flexDirection: 'row',
      },
      actionButton: {
        width: 48,
        padding: 14,
        height: 48,
      },
      actionButtonImage: {
        width: 20,
        height: 20,
      },
      mainName: {
        marginRight: 6,
      },
      mainNameText: {
        color: getColor('textOnColor', 'light'),
      },
      secondaryName: {
        flex: 1,
      },
      secondaryNameText: {
        color: getColor('textOnColor', 'light'),
      },
    });
  }

  render(): React.ReactNode {
    const {mainName, secondaryName, actions} = this.props;

    return (
      <View style={this.styles.header} accessibilityRole="header">
        <View style={this.styles.textWrapper}>
          <View style={this.styles.mainName}>
            <Text type="body-01" style={this.styles.mainNameText} text={mainName} />
          </View>
          <View style={this.styles.secondaryName}>
            <Text type="heading-01" style={this.styles.secondaryNameText} text={secondaryName} breakMode="tail" />
          </View>
        </View>
        {!!(actions && actions.length) && actions.map((action, index) => {
          return (
            <View style={this.styles.actionWrapper} key={index}>
              <Pressable style={this.styles.actionButton} onPress={action.onPress} accessibilityLabel={action.text} accessibilityRole="button">
                <View style={this.styles.actionButtonImage}>{createIcon(action.icon, 20, 20, getColor('textOnColor', 'light'))}</View>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  }
}
