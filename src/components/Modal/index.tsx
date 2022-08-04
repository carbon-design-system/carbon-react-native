import React from 'react';
import {Pressable, ScrollView, StyleSheet, View, Modal as ReactModal, GestureResponderEvent, SafeAreaView} from 'react-native';
import { modalPresentations } from '../../constants/constants';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

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

const baseButtonStyle = {
  height: 72,
  padding: 16,
  paddingTop: 13,
  flex: 1,
};

const styles = StyleSheet.create({
  safeAreaWrapper: {
    position: 'relative',
    flexGrow: 1,
  },
  blurBackground: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: getColor('background'),
    opacity: 0.4,
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
});

export class Modal extends React.Component<ModalProps> {
  componentDidUpdate(previousProps: ModalProps): void {
    const {open} = this.props;

    if (previousProps.open !== open) {
      this.setState({});
    }
  }

  render(): React.ReactNode {
    const {open, title, description, primaryActionOnPress, primaryActionText, secondaryActionOnPress, secondaryActionText, children} = this.props;

    if (!open) {
      return null;
    }

    const hasPrimary = typeof primaryActionOnPress === 'function' && !!primaryActionText;
    const hasSecondary = typeof secondaryActionOnPress === 'function' && !!secondaryActionText;

    return (
      <ReactModal supportedOrientations={modalPresentations} transparent={true} animationType="slide">
        <SafeAreaView style={styles.safeAreaWrapper}>
          <View style={styles.blurBackground} />
          <View style={styles.wrapper}>
            <View style={styles.headerArea}>
              <Text type="heading-03" text={title} />
              {!!description && <Text style={styles.description} type="helper-text-01" text={description} />}
            </View>
            <ScrollView bounces={false} style={styles.content}>
              {children}
            </ScrollView>
            {(hasPrimary || hasSecondary) && (
              <View style={styles.actions}>
                {hasSecondary && <Pressable onPress={secondaryActionOnPress} style={styles.secondaryButton} accessibilityLabel={secondaryActionText} accessibilityRole="button"><Text text={secondaryActionText} /></Pressable>}
                {hasPrimary && <Pressable onPress={primaryActionOnPress} style={styles.primaryButton} accessibilityLabel={primaryActionText} accessibilityRole="button"><Text text={primaryActionText} /></Pressable>}
              </View>
            )}
          </View>
        </SafeAreaView>
      </ReactModal>
    );
  }
}
