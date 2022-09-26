import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, Pressable, Modal as ReactModal, PressableStateCallbackType, Dimensions } from 'react-native';
import { getColor, shadowStyle } from '../../styles/colors';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { maxMenuHeight, Menu } from '../Menu';
import { getTextInputStyle } from '../BaseTextInputs';
import { Text, TextBreakModes, TextTypes } from '../Text';
import type { MenuItemProps } from '../MenuItem';
import ChevronDownIcon from '@carbon/icons/es/chevron--down/20';
import ChevronUpIcon from '@carbon/icons/es/chevron--up/20';
import { modalPresentations } from '../../constants/constants';
import { zIndexes } from '../../styles/z-index';
import { defaultText } from '../../constants/defaultText';

export type DropdownItem = {
  /** ID for tracking items */
  id?: string;
  /** Text to render */
  text: string;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Indicate if item is disabled */
  disabled?: boolean;
  /** Text type to render (Standard is default.  Normally only body 01 or 02 should be used)  */
  textType?: TextTypes;
  /** Indicate if keyboard should be dismissed onPress */
  dismissKeyboardOnPress?: boolean;
};

export type DropdownProps = {
  /** Current value to show on dropdown */
  value: string;
  /** Callback to convert value to human readable text */
  valueToText?: (value: string) => string;
  /** Unset text.  This should be like "Choose option" or similar based on context */
  unsetText: string;
  /** Items to render in the dropdown */
  items: DropdownItem[];
  /** On change callback */
  onChange: (item: DropdownItem) => void;
  /** Label string to use */
  label?: string;
  /** Helper string to use */
  helperText?: string;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Indicate if dropdown is used on layer */
  light?: boolean;
  /** Text to use for on close areas (accessibility). Defaults to ENGLISH "Close" */
  closeText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

export class Dropdown extends React.Component<DropdownProps> {
  state = {
    open: false,
    renderLeft: 0,
    renderRight: 0,
    renderTop: 0,
    renderBottom: 0,
    inverseMenu: false,
  };

  private get itemColor(): string {
    const { disabled } = this.props;

    return disabled ? getColor('textDisabled') : getColor('textPrimary');
  }

  private get styles() {
    const { renderLeft, renderRight, renderTop, renderBottom, inverseMenu } = this.state;

    return StyleSheet.create({
      modal: {
        zIndex: zIndexes.dropdown,
      },
      wrapper: {},
      innerWrapper: {
        position: 'relative',
      },
      closeModal: {
        zIndex: zIndexes.behind,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      },
      menuWrapper: {
        position: 'absolute',
        top: renderTop,
        bottom: renderBottom,
        right: renderRight,
        left: renderLeft,
        maxHeight: inverseMenu ? undefined : maxMenuHeight,
        flexDirection: inverseMenu ? 'column-reverse' : undefined,
        ...shadowStyle,
      },
      iconStyle: {
        position: 'absolute',
        top: 13,
        right: 13,
      },
      dropdownText: {
        color: this.itemColor,
      },
    });
  }

  private get textInputStyles() {
    const { light } = this.props;

    return getTextInputStyle(light);
  }

  private get dropdownIcon(): React.ReactNode {
    const { open } = this.state;

    return <View style={this.styles.iconStyle}>{createIcon(open ? ChevronUpIcon : ChevronDownIcon, 20, 20, this.itemColor)}</View>;
  }

  private toggleDropdown = (): void => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  private closeDropdown = (): void => {
    this.setState({ open: false });
  };

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  /**
   * Calculate where to render the overlayed dropdown menu
   * Sometimes didMount is not called before full render and results in all 0. setTimeout waits for load
   *
   * In event measure returns bad it will load to top of page with min width/height.
   *
   * @param item - View from reference
   */
  private setFormItemRef = (item: View | null): void => {
    if (item && typeof item?.measure === 'function') {
      setTimeout(() => {
        const { renderLeft, renderRight, renderTop, renderBottom, inverseMenu } = this.state;
        const screenWidth = Dimensions.get('window').width || 320;
        const screenHeight = Dimensions.get('window').height || 320;
        const baseSafePadding = 44;

        item.measure((_fx, _fy, width, height, pageX, pageY) => {
          const newRenderLeft = pageX || 0;
          const newRenderRight = screenWidth - (newRenderLeft + (width || 200));
          let newRenderTop = (pageY || 0) + (height || 200);
          let newRenderBottom = baseSafePadding;
          let newInverse = false;

          if (newRenderTop > screenHeight - 200) {
            newRenderBottom = screenHeight - (pageY || 0);
            newRenderTop = baseSafePadding;
            newInverse = true;
          }

          if (renderLeft !== newRenderLeft || renderRight !== newRenderRight || renderTop !== newRenderTop || renderBottom !== newRenderBottom || inverseMenu !== newInverse) {
            this.setState({ renderLeft: newRenderLeft, renderRight: newRenderRight, renderTop: newRenderTop, renderBottom: newRenderBottom, inverseMenu: newInverse });
          }
        });
      });
    }
  };

  render(): React.ReactNode {
    const { items, componentProps, style, label, helperText, value, onChange, disabled, closeText, valueToText, unsetText } = this.props;
    const { open } = this.state;
    const finalStyle = styleReferenceBreaker(disabled ? this.textInputStyles.textBoxDisabled : this.textInputStyles.textBox);
    finalStyle.paddingTop = 10;
    const currentText = typeof valueToText === 'function' ? valueToText(value) : value;

    const itemList = items.map((item) => {
      const newItem = Object.assign({}, item) as MenuItemProps;
      newItem.onPress = () => {
        this.setState({ open: false });
        if (typeof onChange === 'function') {
          onChange(item);
        }
      };

      return newItem;
    });

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityRole="menu" {...(componentProps || {})}>
        {!!label && <Text style={this.textInputStyles.label} type="label-02" text={label} />}
        <View style={this.styles.innerWrapper}>
          <Pressable disabled={disabled} style={(state) => pressableFeedbackStyle(state, finalStyle, this.getStateStyle)} accessibilityLabel={label} accessibilityHint={currentText} onPress={this.toggleDropdown} ref={this.setFormItemRef}>
            <Text text={currentText || unsetText} style={this.styles.dropdownText} />
            {this.dropdownIcon}
          </Pressable>
          {open && (
            <ReactModal style={this.styles.modal} supportedOrientations={modalPresentations} transparent={true} onRequestClose={() => this.setState({ open: false })}>
              <Pressable style={this.styles.closeModal} accessibilityRole="button" accessibilityLabel={closeText || defaultText.close} onPress={this.closeDropdown} />
              <View style={this.styles.menuWrapper}>
                <Menu items={itemList} />
              </View>
            </ReactModal>
          )}
        </View>
        {!!helperText && <Text style={this.textInputStyles.helperText} type="helper-text-02" text={helperText} />}
      </View>
    );
  }
}
