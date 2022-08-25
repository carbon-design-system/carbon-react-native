import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView, Modal as ReactModal, SafeAreaView, Pressable } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { UiPanelItem, UiPanelItemProps } from '../UiPanelItem';
import { modalPresentations } from '../../constants/constants';
import { Overlay } from '../Overlay';
import { BottomSafeAreaColorOverride } from '../BottomSafeAreaColorOverride';

export type UiPanelProps = {
  /** Indicate if the panel should be open */
  open: boolean;
  /** Callback to close the panel */
  onClose: () => void;
  /** List of top level items to render */
  items: UiPanelItemProps[];
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
      blurBackground: {
        zIndex: -1,
        position: 'absolute',
        top: 96,
        right: 0,
        left: 0,
        bottom: 0,
        flex: 1,
      },
      pressableTop: {
        height: 48,
        width: '100%',
      },
      pressableRight: {
        width: 48,
        position: 'absolute',
        top: 96,
        right: 0,
        bottom: 0,
        flex: 1,
      },
      panelWrapper: {
        backgroundColor: getColor('layer01'),
        height: 192,
        marginRight: 48,
      },
    });
  }

  render(): React.ReactNode {
    const { open, items, style, componentProps, onClose } = this.props;

    return (
      open && (
        <ReactModal supportedOrientations={modalPresentations} transparent={true}>
          <Overlay style={this.styles.blurBackground} />
          <BottomSafeAreaColorOverride color={getColor('layer01')} marginRight={48} />
          <SafeAreaView style={this.styles.safeAreaWrapper}>
            <Pressable style={this.styles.pressableTop} onPress={() => onClose()} />
            <Pressable style={this.styles.pressableRight} onPress={() => onClose()} />
            <ScrollView bounces={false} style={styleReferenceBreaker(this.styles.panelWrapper, style)} accessibilityRole="menu" {...(componentProps || {})}>
              {(items || [])
                .filter((item) => !item.hidden)
                .map((item, index) => (
                  <UiPanelItem key={index} {...item} />
                ))}
            </ScrollView>
          </SafeAreaView>
        </ReactModal>
      )
    );
  }
}
