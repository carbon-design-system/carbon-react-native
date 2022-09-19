import React from 'react';
import { GestureResponderEvent, Keyboard, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text, TextTypes } from '../Text';

export type InlineLinkProps = {
  /** Text to render */
  text: string;
  /** Text type to render (Standard is default)  */
  textType?: TextTypes;
  /** onPress event */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
};

/**
 * Link for using in inline with other text.
 *
 * To use import React Native Text wrapper `import { Text as ReactText } from 'react-native';`
 * Use `Text` from the Carbon package.
 * Then use something like:
 * ```
 *   <ReactText>
 *     <Text text="Regular text before link. You can click on " />
 *     <InlineLink text="this link" onPress={() => openLink('https://carbondesignsystem.com')} />
 *     <Text text=" which will open the link." />
 *   </ReactText>
 * ```
 */
export class InlineLink extends React.Component<InlineLinkProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        color: getColor('linkPrimary'),
      },
    });
  }

  private onPress = (event: GestureResponderEvent): void => {
    const { dismissKeyboardOnPress, onPress } = this.props;

    if (dismissKeyboardOnPress && typeof Keyboard?.dismiss === 'function') {
      Keyboard.dismiss();
    }

    if (typeof onPress === 'function') {
      onPress(event);
    }
  };

  render(): React.ReactNode {
    const { text, onLongPress, textType, style } = this.props;

    return <Text type={textType} text={text} style={styleReferenceBreaker(this.styles.wrapper, style)} componentProps={{ accessibilityLabel: text, accessibilityRole: 'link', onPress: this.onPress, onLongPress: onLongPress }} />;
  }
}
