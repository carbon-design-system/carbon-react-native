import React from 'react';
import { ActionSheetIOS, Platform, Pressable, PressableStateCallbackType, StyleProp, ViewStyle, ScrollView, StyleSheet, View, Modal as ReactModal, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import { modalPresentations } from '../../constants/constants';
import { getColor } from '../../styles/colors';
import { Overlay } from '../Overlay';
import { Text } from '../Text';
import { zIndexes } from '../../styles/z-index';
import type { CarbonIcon } from '../../types/shared';

/** Item to pass to ActionSheet */
export type ActionSheetItem = {
  /** Name for button */
  text: string;
  /** Indicate if item is dangerous. When using System iOS action sheet only ONE item can be dangerous. */
  danger?: boolean;
  /** Indicate if hidden (won't show) */
  hidden?: boolean;
  /** Icon data to render on menu (Only for custom action sheet (not rendered for CANCEL button)) */
  icon?: {
    /** Set to an image using `require('../assets/myImage.png')` This will be contained in the view. 20x20 size for rendering (image can be anything but should be square ratio) */
    image?: ImageSourcePropType;
    /** Set to an icon from Carbon (size 20). If both image and icon are set ICON will be used. */
    icon?: CarbonIcon;
  };
  /** Press event (this will also automatically close the ActionSheet as well) */
  onPress: () => void;
  /** Indicate that divider should be rendered (does not apply to last item, and only for non system ActionSheet) */
  divider?: boolean;
};

/** Props for ActionSheet component */
export type ActionSheetProps = {
  /** Title to show */
  title: string;
  /** Body to show */
  body?: string;
  /** Items to render */
  items: ActionSheetItem[];
  /** Cancel button index (index of where cancel button lives) */
  cancelButtonIndex: number;
  /** Indicate if should open (can only open post render; must render then set state) */
  open: boolean;
  /** Force use of the custom action sheet (even if System is supported) */
  forceCustomActionSheet?: boolean;
  /** Indicate that Action Sheet should go full bleed */
  fullBleed?: boolean;
};

/**
 * ActionSheet component for the choice option at the bottom of a screen.
 * Render a popup (from bottom) to show menu options for when non Yes/No questions are needed.
 * Uses the OS ActionSheet if supported. Otherwise renders a custom one with similar styling.
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/ActionSheet.tsx | Example code}
 */
export class ActionSheet extends React.Component<ActionSheetProps> {
  private get styles() {
    const { fullBleed } = this.props;

    return StyleSheet.create({
      modal: {
        zIndex: zIndexes.actionSheet,
      },
      safeAreaWrapper: {
        position: 'relative',
        flexGrow: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
      },
      containerWrapper: {
        flexGrow: 1,
        flexDirection: 'row-reverse',
        margin: fullBleed ? 0 : 16,
        maxWidth: 480,
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
        backgroundColor: getColor('layer01'),
        alignSelf: 'flex-end',
        width: '100%',
      },
      textArea: {
        padding: 16,
        paddingBottom: 0,
        paddingTop: 22,
        borderBottomColor: getColor('borderSubtle01'),
        borderBottomWidth: 1,
      },
      titleNoBody: {
        marginBottom: 8,
      },
      body: {
        marginBottom: 8,
        color: getColor('textHelper'),
      },
      optionsWrapper: {
        maxHeight: '50%',
      },
      options: {
        flexGrow: 0,
      },
      option: {
        padding: 13,
        paddingLeft: 16,
        flexDirection: 'row',
      },
      cancelButton: {
        backgroundColor: getColor('buttonSecondary'),
        padding: 13,
        paddingLeft: 16,
      },
      cancelButtonText: {
        color: getColor('textOnColor'),
      },
      backgroundPress: {
        zIndex: zIndexes.behind,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        flex: 1,
      },
      iconStyle: {
        width: 20,
        height: 20,
        paddingTop: 1,
      },
      iconImageStyle: {
        width: 20,
        height: 20,
      },
      textStyle: {
        flex: 1,
      },
    });
  }

  private handleSystemTrigger = () => {
    const { open, title, body, items, cancelButtonIndex } = this.props;

    const options = items.filter((item) => !item.hidden);
    const dangerIndex = options.findIndex((item) => item.danger);

    if (open) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          destructiveButtonIndex: dangerIndex > -1 ? dangerIndex : undefined,
          options: options.map((item) => item.text),
          title: title,
          message: body,
          cancelButtonIndex: cancelButtonIndex,
        },
        (index) => {
          const action = options[index];

          if (action) {
            action.onPress();
          }
        },
      );
    }
  };

  private get useSystemActionSheet(): boolean {
    const { forceCustomActionSheet } = this.props;

    return Platform.OS === 'ios' && !forceCustomActionSheet;
  }

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('buttonSecondaryActive') } : undefined;
  };

  private getCancelStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  private get customActionSheet(): React.ReactNode {
    const { open, title, body, items, cancelButtonIndex } = this.props;

    const options = items.filter((item) => !item.hidden);
    const cancel = options.splice(cancelButtonIndex || 0, 1)[0] || {
      text: '',
      onPress: () => {},
    };

    if (!open) {
      return null;
    }

    const invisibleButton = <Pressable onPress={cancel.onPress} style={this.styles.backgroundPress} accessible={false} accessibilityRole="none" accessibilityLabel={cancel.text} />;

    return (
      <ReactModal style={this.styles.modal} supportedOrientations={modalPresentations} transparent={true} onRequestClose={cancel.onPress}>
        <Overlay style={this.styles.blurBackground} />
        <SafeAreaView style={this.styles.safeAreaWrapper}>
          {invisibleButton}
          <View style={this.styles.containerWrapper}>
            {invisibleButton}
            <View style={this.styles.wrapper}>
              <View style={this.styles.textArea}>
                <Text style={body ? undefined : this.styles.titleNoBody} type="heading-compact-01" text={title} />
                {!!body && <Text style={this.styles.body} type="helper-text-01" text={body} />}
              </View>
              <View style={this.styles.optionsWrapper}>
                <ScrollView bounces={false} style={this.styles.options}>
                  {options.map((item, index) => {
                    const finalStyle = styleReferenceBreaker(this.styles.option);
                    const lastItem = index === options.length - 1;

                    let imageItem: React.ReactNode | undefined;

                    if (item.icon?.icon) {
                      imageItem = createIcon(item.icon.icon, 20, 20);
                    } else if (item.icon?.image) {
                      imageItem = <Image style={this.styles.iconImageStyle} resizeMode="contain" source={item.icon.image} />;
                    }

                    if (item.danger) {
                      finalStyle.backgroundColor = getColor('buttonDangerPrimary');
                    }

                    if (item.divider && !lastItem) {
                      finalStyle.borderBottomColor = finalStyle.borderBottomColor || getColor('borderSubtle00');
                      finalStyle.borderBottomWidth = finalStyle.borderBottomWidth || 1;
                    }

                    return (
                      <Pressable
                        style={(state) => pressableFeedbackStyle(state, finalStyle, this.getStateStyle)}
                        accessibilityLabel={item.text}
                        key={index}
                        onPress={() => {
                          item.onPress();
                        }}
                      >
                        <Text style={this.styles.textStyle} text={item.text} />
                        {!!imageItem && <View style={this.styles.iconStyle}>{imageItem}</View>}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
              <Pressable
                style={(state) => pressableFeedbackStyle(state, this.styles.cancelButton, this.getCancelStateStyle)}
                accessibilityLabel={cancel.text}
                onPress={() => {
                  cancel.onPress();
                }}
              >
                <Text style={this.styles.cancelButtonText} text={cancel.text} />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ReactModal>
    );
  }

  componentDidUpdate(previousProps: ActionSheetProps): void {
    const { open } = this.props;

    if (previousProps.open !== open) {
      if (this.useSystemActionSheet) {
        this.handleSystemTrigger();
      }
    }
  }

  componentDidMount(): void {
    if (this.useSystemActionSheet) {
      this.handleSystemTrigger();
    }
  }

  render(): React.ReactNode {
    if (!this.useSystemActionSheet) {
      return this.customActionSheet;
    }

    return null;
  }
}
