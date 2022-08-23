import React from 'react';
import { GestureResponderEvent, ViewProps, StyleProp, StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import CloseIcon from '@carbon/icons/es/close/20';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

export type TagTypes = 'red' | 'magenta' | 'purple' | 'blue' | 'cyan' | 'teal' | 'green' | 'gray' | 'cool-gray' | 'warm-gray';

export type TagProps = {
  /** Title of tag to render */
  title: string;
  /** Indicate if tag is disabled */
  disabled?: boolean;
  /** Tag color to render (Standard is blue)  */
  tagType?: TagTypes;
  /** onPress event for the close action (if set will render the filter X) */
  onClosePress?: (event: GestureResponderEvent) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class Tag extends React.Component<TagProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        alignSelf: 'flex-start',
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 32,
        backgroundColor: getColor('tagBackgroundGray'),
        flexDirection: 'row',
      },
      textStyle: {
        lineHeight: 16,
      },
      action: {
        paddingLeft: 8,
        alignSelf: 'center',
      },
    });
  }

  private get textColor(): string {
    const { disabled, tagType } = this.props;

    if (disabled) {
      return getColor('textDisabled');
    }

    switch (tagType) {
      case 'red':
        return getColor('tagColorRed');
      case 'magenta':
        return getColor('tagColorMagenta');
      case 'purple':
        return getColor('tagColorPurple');
      case 'cyan':
        return getColor('tagColorCyan');
      case 'teal':
        return getColor('tagColorTeal');
      case 'green':
        return getColor('tagColorGreen');
      case 'gray':
        return getColor('tagColorGray');
      case 'cool-gray':
        return getColor('tagColorCoolGray');
      case 'warm-gray':
        return getColor('tagColorWarmGray');
      case 'blue':
      default:
        return getColor('tagColorBlue');
    }
  }

  private get backgroundColor(): string {
    const { disabled, tagType } = this.props;

    if (disabled) {
      return getColor('layer01');
    }

    switch (tagType) {
      case 'red':
        return getColor('tagBackgroundRed');
      case 'magenta':
        return getColor('tagBackgroundMagenta');
      case 'purple':
        return getColor('tagBackgroundPurple');
      case 'cyan':
        return getColor('tagBackgroundCyan');
      case 'teal':
        return getColor('tagBackgroundTeal');
      case 'green':
        return getColor('tagBackgroundGreen');
      case 'gray':
        return getColor('tagBackgroundGray');
      case 'cool-gray':
        return getColor('tagBackgroundCoolGray');
      case 'warm-gray':
        return getColor('tagBackgroundWarmGray');
      case 'blue':
      default:
        return getColor('tagBackgroundBlue');
    }
  }

  private get closeAction(): React.ReactNode {
    const { onClosePress, title, disabled } = this.props;

    if (typeof onClosePress === 'function') {
      return (
        <Pressable onPress={onClosePress} disabled={disabled} accessibilityLabel={title} accessibilityRole="button" style={(state) => pressableFeedbackStyle(state, this.styles.action)}>
          {createIcon(CloseIcon, 16, 16, this.textColor)}
        </Pressable>
      );
    }

    return null;
  }

  render(): React.ReactNode {
    const { title, componentProps, style } = this.props;
    const textStyle = styleReferenceBreaker(this.styles.textStyle);
    const wrapperStyle = styleReferenceBreaker(this.styles.wrapper, style);
    wrapperStyle.backgroundColor = this.backgroundColor;
    textStyle.color = this.textColor;

    return (
      <View style={wrapperStyle} {...(componentProps || {})}>
        <Text type="body-compact-01" style={textStyle} text={title} />
        {this.closeAction}
      </View>
    );
  }
}
