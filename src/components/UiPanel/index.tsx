import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView, Modal as ReactModal, SafeAreaView, Pressable, View } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { UiPanelItem, UiPanelItemProps } from '../UiPanelItem';
import { modalPresentations } from '../../constants/constants';
import { BottomSafeAreaColorOverride } from '../BottomSafeAreaColorOverride';
import { defaultText } from '../../constants/defaultText';
import { zIndexes } from '../../styles/z-index';

export type UiPanelProps = {
  /** Indicate if the panel should be open */
  open: boolean;
  /** Callback to close the panel */
  onClose: () => void;
  /** List of top level items to render */
  items: UiPanelItemProps[];
  /** Text to use for on close areas (accessibility). Defaults to ENGLISH "Close" */
  onCloseText?: string;
  /** Indicate if should close if pressing item with no children */
  closeOnNoChildrenPress?: boolean;
  /** Custom style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class UiPanel extends React.Component<UiPanelProps> {
  private get styles() {
    return StyleSheet.create({
      safeAreaWrapper: {
        position: 'relative',
        flexGrow: 1,
      },
      innerWrapping: {
        position: 'relative',
        flexGrow: 1,
      },
      pressableTop: {
        height: 48,
      },
      pressableRight: {
        zIndex: zIndexes.behind,
        backgroundColor: getColor('overlay'),
        position: 'absolute',
        top: 48,
        right: 0,
        bottom: 0,
        left: 0,
      },
      panelWrapper: {
        flex: 1,
        backgroundColor: getColor('layer01'),
        marginRight: 48,
      },
      panelWrapperInner: {
        paddingBottom: 48,
      },
    });
  }

  render(): React.ReactNode {
    const { open, items, style, componentProps, onClose, onCloseText, closeOnNoChildrenPress } = this.props;

    return (
      open && (
        <ReactModal supportedOrientations={modalPresentations} transparent={true}>
          <BottomSafeAreaColorOverride color={getColor('layer01')} marginRight={48} />
          <SafeAreaView style={this.styles.safeAreaWrapper}>
            <View style={this.styles.innerWrapping}>
              <Pressable style={this.styles.pressableTop} accessibilityRole="button" accessibilityLabel={onCloseText || defaultText.close} onPress={onClose} />
              <Pressable style={this.styles.pressableRight} accessibilityRole="button" accessibilityLabel={onCloseText || defaultText.close} onPress={onClose} />
              <ScrollView bounces={false} style={styleReferenceBreaker(this.styles.panelWrapper, style)} contentContainerStyle={this.styles.panelWrapperInner} accessibilityRole="menu" {...(componentProps || {})}>
                {(items || [])
                  .filter((item) => !item.hidden)
                  .map((item, index) => (
                    <UiPanelItem key={index} {...item} noChildrenPressCallback={closeOnNoChildrenPress ? onClose : undefined} />
                  ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </ReactModal>
      )
    );
  }
}
