import React from 'react';
import { GestureResponderEvent, ViewProps, StyleProp, StyleSheet, View, ViewStyle, Pressable, PressableStateCallbackType } from 'react-native';
import { createIcon, pressableFeedbackStyle } from '../../helpers';
import CloseIcon from '@carbon/icons/es/close/20';
import { getColor } from '../../styles/colors';
import { Text, TextBreakModes } from '../Text';

/** Type of tags */
export type TagTypes = 'red' | 'magenta' | 'purple' | 'blue' | 'cyan' | 'teal' | 'green' | 'gray' | 'cool-gray' | 'warm-gray' | 'high-contrast';

/** Props for Tag component */
export type TagProps = {
  /** Title of tag to render */
  title: string;
  /** Indicate if tag is disabled */
  disabled?: boolean;
  /** Tag color to render (Standard is blue)  */
  tagType?: TagTypes;
  /** onPress event for the close action (if set will render the filter X) */
  onClosePress?: (event: GestureResponderEvent) => void;
  /** Break mode used on string type content (default is tail) */
  breakMode?: TextBreakModes;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * Tag component for rendering a tag
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Tag.tsx | Example code}
 */
export class Tag extends React.Component<TagProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        alignSelf: 'flex-start',
        borderRadius: 32,
        minHeight: 32,
        backgroundColor: getColor('tagBackgroundGray'),
        flexDirection: 'row',
        overflow: 'hidden',
      },
      textStyle: {
        padding: 7,
        paddingLeft: 12,
        paddingRight: 12,
        flexShrink: 1,
      },
      action: {
        borderRadius: 32,
        padding: 8,
        height: 32,
        width: 32,
        alignSelf: 'center',
        justifyContent: 'center',
      },
    });
  }

  private get activeColor(): string {
    const { disabled, tagType } = this.props;

    if (disabled) return getColor('layer01');

    switch (tagType) {
      case 'red':
        return getColor('tagHoverRed');
      case 'magenta':
        return getColor('tagHoverMagenta');
      case 'purple':
        return getColor('tagHoverPurple');
      case 'cyan':
        return getColor('tagHoverCyan');
      case 'teal':
        return getColor('tagHoverTeal');
      case 'green':
        return getColor('tagHoverGreen');
      case 'gray':
        return getColor('tagHoverGray');
      case 'cool-gray':
        return getColor('tagHoverCoolGray');
      case 'warm-gray':
        return getColor('tagHoverWarmGray');
      case 'high-contrast':
        return getColor('tagHoverHighContrast');
      case 'blue':
      default:
        return getColor('tagHoverBlue');
    }
  }

  private get textColor(): string {
    const { disabled, tagType } = this.props;

    if (disabled) return getColor('textDisabled');

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
      case 'high-contrast':
        return getColor('tagColorHighContrast');
      case 'blue':
      default:
        return getColor('tagColorBlue');
    }
  }

  private get backgroundColor(): string {
    const { disabled, tagType } = this.props;

    if (disabled) return getColor('layer01');

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
      case 'high-contrast':
        return getColor('tagBackgroundHighContrast');
      case 'blue':
      default:
        return getColor('tagBackgroundBlue');
    }
  }

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: this.activeColor } : undefined;
  };

  private get closeAction(): React.ReactNode {
    const { onClosePress, title, disabled } = this.props;

    if (typeof onClosePress === 'function') {
      return (
        <Pressable onPress={onClosePress} disabled={disabled} accessibilityLabel={title} accessibilityRole="button" style={(state) => pressableFeedbackStyle(state, this.styles.action, this.getStateStyle)}>
          {createIcon(CloseIcon, 16, 16, this.textColor)}
        </Pressable>
      );
    }

    return null;
  }

  render(): React.ReactNode {
    const { title, componentProps, style, breakMode } = this.props;
    const textStyle = StyleSheet.flatten([this.styles.textStyle, { color: this.textColor }]);
    const wrapperStyle = StyleSheet.flatten([this.styles.wrapper, style, { backgroundColor: this.backgroundColor }]);

    return (
      <View style={wrapperStyle} {...(componentProps || {})}>
        <Text type="label-02" breakMode={breakMode || 'tail'} style={textStyle} text={title} />
        {this.closeAction}
      </View>
    );
  }
}
