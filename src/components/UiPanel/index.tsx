import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, ScrollView, Modal as ReactModal, Pressable, View, Animated } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { UiPanelItem, UiPanelItemProps } from '../UiPanelItem';
import { modalPresentations } from '../../constants/constants';
import { BottomSafeAreaColorOverride } from '../BottomSafeAreaColorOverride';
import { defaultText } from '../../constants/defaultText';
import { zIndexes } from '../../styles/z-index';
import { SafeAreaWrapper } from '../SafeAreaWrapper';

/** Props for UiPanel component */
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

/**
 * UiPanel component for rendering a slide over panel that overlays on the UI
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/UiPanel.tsx | Example code}
 */
export class UiPanel extends React.Component<UiPanelProps> {
  private animatedValue = new Animated.Value(0);

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
      animatedWrapper: {
        flexGrow: 1,
        opacity: 0,
      },
      pressableTop: {
        height: 48,
      },
      pressableRight: {
        zIndex: zIndexes.behind,
        backgroundColor: getColor('overlay'),
        position: 'absolute',
        top: 49,
        right: 0,
        bottom: 0,
        left: 0,
      },

      panelWrapper: {
        borderTopColor: getColor('borderSubtle01'),
        borderTopWidth: 1,
        flex: 1,
        backgroundColor: getColor('layer01'),
        marginRight: 48,
      },
      panelWrapperInner: {
        paddingBottom: 48,
      },
    });
  }

  private loadIn = (): void => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  private loadOut = (): void => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount(): void {
    const { open } = this.props;

    if (open) {
      this.loadIn();
    } else {
      this.loadOut();
    }
  }

  componentDidUpdate(previousProps: UiPanelProps): void {
    const { open } = this.props;

    if (open !== previousProps.open) {
      if (open) {
        this.loadIn();
      } else {
        this.loadOut();
      }
    }
  }

  render(): React.ReactNode {
    const { open, items, style, componentProps, onClose, onCloseText, closeOnNoChildrenPress } = this.props;

    return (
      open && (
        <ReactModal supportedOrientations={modalPresentations} transparent={true}>
          <Animated.View style={[this.styles.animatedWrapper, { opacity: this.animatedValue }]}>
            <BottomSafeAreaColorOverride color={getColor('layer01')} marginRight={48} backgroundOverlay={true} />
            <SafeAreaWrapper style={this.styles.safeAreaWrapper}>
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
            </SafeAreaWrapper>
          </Animated.View>
        </ReactModal>
      )
    );
  }
}
