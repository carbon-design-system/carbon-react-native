import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { Text } from '../Text';
import ErrorIcon from '@carbon/icons/es/error--filled/20';
import WarningIcon from '@carbon/icons/es/warning--filled/20';
import SuccessIcon from '@carbon/icons/es/checkmark--filled/20';
import InfoIcon from '@carbon/icons/es/information--filled/20';
import CloseIcon from '@carbon/icons/es/close/20';
import { Button } from '../Button';
import { defaultText } from '../../constants/defaultText';

export type NotificationTypes = 'info' | 'error' | 'warning' | 'success';

export type NotificationProps = {
  /** Notification kind (defeault is info)  */
  kind?: NotificationTypes;
  /** Title of the notification */
  title: string;
  /** Subtitle of the notification */
  subTitle?: string;
  /** Action area for buttons or other content. Anything can be used; recommended is ghost or tertiary [this may be out of date with new dark mode tertiary] button. */
  actionArea?: React.ReactNode;
  /** Callback when dismiss is pressed (will render X to dismiss if set) */
  onDismiss?: () => void;
  /** Text to use for on dismiss icon (accessibility). Defaults to ENGLISH "Close" */
  onDismissText?: string;
  /** Indicate if low contrast mode should be used */
  lowContrast?: boolean;
  /** Indicatre if items should stack instead of being side by side */
  multiLine?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * Notification component is "InlineNotification" by default and can be
 * used as "ToastNotification" by using multiLine flag and setting max width (follow Carbon web for Toast).
 */
export class Notification extends React.Component<NotificationProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        borderLeftWidth: 3,
        padding: 16,
        paddingRight: 0,
        paddingTop: 0,
        flexDirection: 'row',
      },
      icon: {
        paddingTop: 16,
        marginRight: 16,
      },
      content: {
        paddingTop: 16,
        paddingRight: 16,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      textWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      actionWrapper: {},
      close: {},
    });
  }

  private get accentColor(): string {
    const { lowContrast, kind } = this.props;

    if (lowContrast) {
      switch (kind) {
        case 'error':
          return getColor('supportError');
        case 'warning':
          return getColor('supportWarning');
        case 'success':
          return getColor('supportSuccess');
        case 'info':
        default:
          return getColor('supportInfo');
      }
    } else {
      switch (kind) {
        case 'error':
          return getColor('supportErrorInverse');
        case 'warning':
          return getColor('supportWarningInverse');
        case 'success':
          return getColor('supportSuccessInverse');
        case 'info':
        default:
          return getColor('supportInfoInverse');
      }
    }
  }

  private get textColor(): string {
    const { lowContrast } = this.props;

    // textPrimary is listed for the text color but dark mode does not work. Forcing light for all themes
    return lowContrast ? getColor('textPrimary', 'light') : getColor('textInverse');
  }

  private get backgroundColor(): string {
    const { lowContrast, kind } = this.props;

    if (lowContrast) {
      switch (kind) {
        case 'error':
          return getColor('notificationBackgroundError');
        case 'warning':
          return getColor('notificationBackgroundWarning');
        case 'success':
          return getColor('notificationBackgroundSuccess');
        case 'info':
        default:
          return getColor('notificationBackgroundInfo');
      }
    } else {
      return getColor('backgroundInverse');
    }
  }

  private get icon(): React.ReactNode {
    const { kind } = this.props;

    switch (kind) {
      case 'error':
        return createIcon(ErrorIcon, 22, 22, this.accentColor);
      case 'warning':
        return createIcon(WarningIcon, 22, 22, this.accentColor);
      case 'success':
        return createIcon(SuccessIcon, 22, 22, this.accentColor);
      case 'info':
      default:
        return createIcon(InfoIcon, 22, 22, this.accentColor);
    }
  }

  private get notificationContent(): React.ReactNode {
    const { title, subTitle, actionArea, multiLine } = this.props;
    const textStype = { color: this.textColor, marginRight: 16 };
    const wrapper = styleReferenceBreaker(this.styles.content);
    const textWrapper = styleReferenceBreaker(this.styles.textWrapper);
    const hasAction = !!actionArea;

    if (multiLine) {
      wrapper.flexDirection = 'column';
      wrapper.flexWrap = 'nowrap';
      textWrapper.flexWrap = 'nowrap';
      textWrapper.flexDirection = 'column';

      if (hasAction) {
        textWrapper.marginBottom = 24;
      }
    }

    return (
      <View style={wrapper}>
        <View style={textWrapper}>
          <Text style={textStype} type="heading-compact-01" text={title} />
          {!!subTitle && <Text style={textStype} type="body-compact-01" text={subTitle} />}
        </View>
        {hasAction && <View style={this.styles.actionWrapper}>{actionArea}</View>}
      </View>
    );
  }

  private get dismissArea(): React.ReactNode {
    const { onDismiss, onDismissText } = this.props;

    if (typeof onDismiss === 'function') {
      return (
        <View style={this.styles.close}>
          <Button kind="ghost" overrideColor={this.textColor} iconOnlyMode={true} onPress={onDismiss} text={onDismissText || defaultText.close} icon={CloseIcon} />
        </View>
      );
    }

    return null;
  }

  render(): React.ReactNode {
    const { componentProps, style } = this.props;
    const finalStyle = styleReferenceBreaker(this.styles.wrapper);
    finalStyle.backgroundColor = this.backgroundColor;
    finalStyle.borderLeftColor = this.accentColor;

    return (
      <View style={styleReferenceBreaker(finalStyle, style)} accessibilityRole="alert" {...(componentProps || {})}>
        <View style={this.styles.icon}>{this.icon}</View>
        {this.notificationContent}
        {this.dismissArea}
      </View>
    );
  }
}
