import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewProps, ViewStyle, PressableStateCallbackType } from 'react-native';
import type { CarbonIcon } from '../../types/shared';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

/** Action item for the web header */
export type WebHeaderAction = {
  /** Icon to render (size 20) */
  icon: CarbonIcon;
  /** Text to describe icon */
  text: string;
  /** On press event */
  onPress?: () => void;
  /** On long press event */
  onLongPress?: () => void;
};

/** Props for WebHeader component */
export type WebHeaderProps = {
  /** actions to render to the right side */
  actions?: WebHeaderAction[];
  /** Name to show first */
  mainName: string;
  /** Secondary name to show after mainName (in bold) */
  secondaryName: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * WebHeader component for rendering the header bar that matches Carbon Web
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/WebHeader.tsx | Example code}
 */
export class WebHeader extends React.Component<WebHeaderProps> {
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

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  render(): React.ReactNode {
    const { mainName, secondaryName, actions, style, componentProps } = this.props;

    return (
      <View style={styleReferenceBreaker(this.styles.header, style)} accessibilityRole="header" {...(componentProps || {})}>
        <View style={this.styles.textWrapper}>
          <View style={this.styles.mainName}>
            <Text type="body-01" style={this.styles.mainNameText} text={mainName} />
          </View>
          <View style={this.styles.secondaryName}>
            <Text type="heading-01" style={this.styles.secondaryNameText} text={secondaryName} breakMode="tail" />
          </View>
        </View>
        {!!(actions && actions.length) &&
          actions.map((action, index) => {
            return (
              <View style={this.styles.actionWrapper} key={index}>
                <Pressable style={(state) => pressableFeedbackStyle(state, this.styles.actionButton, this.getStateStyle)} onPress={action.onPress} accessibilityLabel={action.text} accessibilityRole="button">
                  <View style={this.styles.actionButtonImage}>{createIcon(action.icon, 20, 20, getColor('textOnColor', 'light'))}</View>
                </Pressable>
              </View>
            );
          })}
      </View>
    );
  }
}
