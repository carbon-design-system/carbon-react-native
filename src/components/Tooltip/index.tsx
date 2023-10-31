import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, Pressable, Modal as ReactModal, Dimensions, DimensionValue } from 'react-native';
import { getColor, shadowStyle } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import { modalPresentations } from '../../constants/constants';
import { zIndexes } from '../../styles/z-index';
import { defaultText } from '../../constants/defaultText';
import { Button, ButtonProps } from '../Button';
import { Link, LinkProps } from '../Link';

/** Positions for the caret on tooltips */
export type TooltipCaretPosition = 'left' | 'right' | 'center';

/** Props for Tooltip component */
export type TooltipProps = {
  /** Tooltip content (renders in layer box, can customize via contentStyle) */
  content: React.ReactNode;
  /** Tooltip trigger button props (if set will render trigger button [onPress will be overriden. Do not set]). If both link and button props are set link takes priority */
  buttonProps?: ButtonProps;
  /** Tooltip trigger button props (if set will render trigger link [onPress will be overriden. Do not set]) */
  linkProps?: LinkProps;
  /** Caret position (default is left) */
  caretPosition?: TooltipCaretPosition;
  /** Text to use for on close areas (accessibility). Defaults to ENGLISH "Close" */
  closeText?: string;
  /** Height to render tooltip (default is 200. If larger content use ScrollView for the content) */
  height?: number;
  /** Style to set on the content wrapper */
  contentStyle?: StyleProp<ViewStyle>;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * Tooltip component for rendering a tooltip popup
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Tooltip.tsx | Example code}
 */
export class Tooltip extends React.Component<TooltipProps> {
  state = {
    open: false,
    renderLeft: 0,
    renderTop: 0,
    renderBottom: 0,
    inverseMenu: false,
  };

  private get styles() {
    const { renderLeft, renderTop, renderBottom, inverseMenu } = this.state;

    const caret = {
      width: 12,
      height: 12,
      backgroundColor: getColor('backgroundInverse'),
      position: 'absolute' as const,
      top: inverseMenu ? undefined : -6,
      bottom: inverseMenu ? -6 : undefined,
      transform: [{ rotate: '45deg' }],
      right: undefined as undefined | DimensionValue,
      left: 18 as undefined | DimensionValue,
    };

    switch (this.caretPosition) {
      case 'center':
        caret.right = '50%';
        caret.left = '50%';
        break;
      case 'right':
        caret.right = 18;
        caret.left = undefined;
        break;
    }

    return StyleSheet.create({
      modal: {
        zIndex: zIndexes.dropdown,
      },
      wrapper: {},
      closeModal: {
        zIndex: zIndexes.behind,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      },
      tooltipWrapper: {
        backgroundColor: getColor('backgroundInverse'),
        maxWidth: 336,
        padding: 16,
        borderRadius: 2,
        position: 'absolute',
        top: renderTop,
        bottom: renderBottom,
        left: renderLeft,
        ...shadowStyle,
      },
      caret: caret,
    });
  }

  private toggleTooltip = (): void => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  private closeTooltip = (): void => {
    this.setState({ open: false });
  };

  private get height(): number {
    const { height } = this.props;

    return height || 200;
  }

  private get caretPosition(): TooltipCaretPosition {
    const { caretPosition } = this.props;

    return caretPosition || 'left';
  }

  /**
   * Calculate where to render the overlayed tooltip
   * Sometimes didMount is not called before full render and results in all 0. setTimeout waits for load
   *
   * In event measure returns bad it will load to top of page with min width/height.
   *
   * @param item - View from reference
   */
  private setFormItemRef = (item: View | null): void => {
    if (item && typeof item?.measure === 'function') {
      setTimeout(() => {
        const { renderLeft, renderTop, renderBottom, inverseMenu } = this.state;
        const screenHeight = Dimensions.get('window').height || 320;
        const caretSize = 12;

        item.measure((_fx, _fy, _width, height, pageX, pageY) => {
          const newRenderLeft = pageX || 0;
          let newRenderTop = (pageY || 0) + (height || 200) + caretSize;
          let newRenderBottom = screenHeight - (newRenderTop + this.height);
          let newInverse = false;

          if (newRenderTop > screenHeight - this.height) {
            newRenderBottom = screenHeight - (pageY || 0) + caretSize;
            newRenderTop = screenHeight - (newRenderBottom + this.height);
            newInverse = true;
          }

          if (screenHeight - (newRenderBottom + newRenderTop) < this.height) {
            if (newInverse) {
              newRenderTop = 44;
            } else {
              newRenderBottom = 44;
            }
          }

          if (renderLeft !== newRenderLeft || renderTop !== newRenderTop || renderBottom !== newRenderBottom || inverseMenu !== newInverse) {
            this.setState({ renderLeft: newRenderLeft, renderTop: newRenderTop, renderBottom: newRenderBottom, inverseMenu: newInverse });
          }
        });
      });
    }
  };

  render(): React.ReactNode {
    const { content, componentProps, style, contentStyle, linkProps, buttonProps, closeText } = this.props;
    const { open } = this.state;

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="menu" {...(componentProps || {})}>
        <View>
          {linkProps ? <Link {...linkProps} onPress={this.toggleTooltip} forwardRef={this.setFormItemRef} /> : <Button {...(buttonProps || { text: '' })} overrideColor={buttonProps?.iconOnlyMode ? (open ? getColor('iconPrimary') : getColor('iconSecondary')) : undefined} onPress={this.toggleTooltip} forwardRef={this.setFormItemRef} />}
          {open && (
            <ReactModal style={this.styles.modal} supportedOrientations={modalPresentations} transparent={true} onRequestClose={() => this.setState({ open: false })}>
              <Pressable style={this.styles.closeModal} accessibilityRole="button" accessibilityLabel={closeText || defaultText.close} onPress={this.closeTooltip} />
              <View style={styleReferenceBreaker(this.styles.tooltipWrapper, contentStyle)}>
                <View style={this.styles.caret} />
                {content}
              </View>
            </ReactModal>
          )}
        </View>
      </View>
    );
  }
}
