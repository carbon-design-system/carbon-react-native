import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, Pressable, Modal as ReactModal, SafeAreaView } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { Menu } from '../Menu';
import { getTextInputStyle } from '../BaseTextInputs';
import { Text, TextBreakModes, TextTypes } from '../Text';
import type { MenuItemProps } from '../MenuItem';
import ChevronDownIcon from '@carbon/icons/es/chevron--down/20';
import ChevronUpIcon from '@carbon/icons/es/chevron--up/20';
import { modalPresentations } from '../../constants/constants';
import { zIndexes } from '../../styles/z-index';

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
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * React Native does not allow zIndex to overlay non sibling Views.
 * Therefore without extreme control when using this component of lowering zIndex of Views around it this will not work great.
 * Therefore this will open a full screen overlay menu system.
 * We should try and find a better way. But as of now does not seem to work with zIndex.
 */
export class Dropdown extends React.Component<DropdownProps> {
  state = {
    open: false,
  };

  private get itemColor(): string {
    const { disabled } = this.props;

    return disabled ? getColor('textDisabled') : getColor('textPrimary');
  }

  private get styles() {
    return StyleSheet.create({
      modal: {
        zIndex: zIndexes.dropdown,
      },
      wrapper: {
        maxHeight: 280,
      },
      innerWrapper: {
        position: 'relative',
      },
      menuWrapper: {
        height: '100%',
        maxHeight: '100%',
      },
      iconStyle: {
        position: 'absolute',
        top: 12,
        right: 12,
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

    return <View style={this.styles.iconStyle}>{createIcon(open ? ChevronUpIcon : ChevronDownIcon, 22, 22, this.itemColor)}</View>;
  }

  private toggleDropdown = (): void => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render(): React.ReactNode {
    const { items, componentProps, style, label, helperText, value, onChange, disabled } = this.props;
    const { open } = this.state;
    const finalStyle = styleReferenceBreaker(disabled ? this.textInputStyles.textBoxDisabled : this.textInputStyles.textBox);
    finalStyle.paddingTop = 10;

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
          <Pressable disabled={disabled} style={finalStyle} onPress={this.toggleDropdown}>
            <Text text={value} style={this.styles.dropdownText} />
            {this.dropdownIcon}
          </Pressable>
          {open && (
            <ReactModal style={this.styles.modal} supportedOrientations={modalPresentations} transparent={true} onRequestClose={() => this.setState({ open: false })}>
              <SafeAreaView>
                <Menu style={this.styles.menuWrapper} items={itemList} />
              </SafeAreaView>
            </ReactModal>
          )}
        </View>
        {!!helperText && <Text style={this.textInputStyles.helperText} type="helper-text-02" text={helperText} />}
      </View>
    );
  }
}
