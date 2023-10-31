import React from 'react';
import { Pressable, ScrollView, StyleSheet, View, Modal as ReactModal, GestureResponderEvent, SafeAreaView, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { zIndexes } from '../../styles/z-index';
import { modalPresentations } from '../../constants/constants';
import { getColor } from '../../styles/colors';
import { Overlay } from '../Overlay';
import { Text } from '../Text';
import { pressableFeedbackStyle } from '../../helpers';

/** Props for Modal component */
export type ModalProps = {
  /** Title to show */
  title: string;
  /** Body to show */
  description?: string;
  /** Items to render */
  children?: React.ReactNode;
  /** Primary button action (will not render if function and text not set) */
  primaryActionOnPress?: (event: GestureResponderEvent) => void;
  /** Primary text for action */
  primaryActionText?: string;
  /** Secondary button action (will not render if function and text not set) */
  secondaryActionOnPress?: (event: GestureResponderEvent) => void;
  /** Secondary text for action */
  secondaryActionText?: string;
  /** Indicate if should open */
  open: boolean;
};

/**
 * Modal component for showing a center modal (overlay) with info and call to actions
 *
 * Multiple React Modals are not currently supported in React Native.
 * However, you can open a modal from within a modal. Just not side by side.
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Modal.tsx | Example code}
 */
export class Modal extends React.Component<ModalProps> {
  private get styles() {
    const baseButtonStyle = {
      height: 72,
      padding: 16,
      paddingTop: 13,
      flex: 1,
    };

    return StyleSheet.create({
      modal: {
        zIndex: zIndexes.modal,
      },
      safeAreaWrapper: {
        position: 'relative',
        flexGrow: 1,
      },
      blurBackground: {
        zIndex: zIndexes.behind,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        flex: 1,
      },
      wrapper: {
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: getColor('layer01'),
        alignSelf: 'center',
        marginRight: 16,
        marginLeft: 16,
        minWidth: 320,
      },
      headerArea: {
        padding: 16,
      },
      description: {
        marginTop: 16,
      },
      content: {
        flexGrow: 0,
        padding: 16,
        paddingBottom: 48,
      },
      actions: {
        flexDirection: 'row',
      },
      secondaryButton: {
        backgroundColor: getColor('buttonSecondary'),
        ...baseButtonStyle,
      },
      primaryButton: {
        backgroundColor: getColor('buttonPrimary'),
        ...baseButtonStyle,
      },
      buttonText: {
        color: getColor('textOnColor'),
      },
    });
  }

  private getPrimaryStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('buttonPrimaryActive') } : undefined;
  };

  private getSecondaryStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('buttonSecondaryActive') } : undefined;
  };

  render(): React.ReactNode {
    const { open, title, description, primaryActionOnPress, primaryActionText, secondaryActionOnPress, secondaryActionText, children } = this.props;

    if (!open) {
      return null;
    }

    const hasPrimary = typeof primaryActionOnPress === 'function' && !!primaryActionText;
    const hasSecondary = typeof secondaryActionOnPress === 'function' && !!secondaryActionText;

    return (
      <ReactModal style={this.styles.modal} supportedOrientations={modalPresentations} transparent={true}>
        <Overlay style={this.styles.blurBackground} />
        <SafeAreaView style={this.styles.safeAreaWrapper}>
          <View style={this.styles.wrapper}>
            <View style={this.styles.headerArea}>
              <Text type="heading-03" text={title} />
              {!!description && <Text style={this.styles.description} type="helper-text-01" text={description} />}
            </View>
            <ScrollView bounces={false} style={this.styles.content}>
              {children}
            </ScrollView>
            {(hasPrimary || hasSecondary) && (
              <View style={this.styles.actions}>
                {hasSecondary && (
                  <Pressable onPress={secondaryActionOnPress} style={(state) => pressableFeedbackStyle(state, this.styles.secondaryButton, this.getSecondaryStateStyle)} accessibilityLabel={secondaryActionText} accessibilityRole="button">
                    <Text style={this.styles.buttonText} text={secondaryActionText} />
                  </Pressable>
                )}
                {hasPrimary && (
                  <Pressable onPress={primaryActionOnPress} style={(state) => pressableFeedbackStyle(state, this.styles.primaryButton, this.getPrimaryStateStyle)} accessibilityLabel={primaryActionText} accessibilityRole="button">
                    <Text style={this.styles.buttonText} text={primaryActionText} />
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
      </ReactModal>
    );
  }
}
