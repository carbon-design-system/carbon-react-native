import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, GestureResponderEvent, Pressable, PressableStateCallbackType } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import ChevronDownIcon from '@carbon/icons/es/chevron--down/20';
import ChevronUpIcon from '@carbon/icons/es/chevron--up/20';
import CheckmarkIcon from '@carbon/icons/es/checkmark--outline/20';
import ErrorIcon from '@carbon/icons/es/error--outline/20';
import PendingIcon from '@carbon/icons/es/circle-dash/20';
import ActiveIcon from '@carbon/icons/es/incomplete/20';
import { Text } from '../Text';

/** Props for ProgressIndicator component */
export type ProgressIndicatorProps = {
  /** Title to show for the accordion  */
  title: string;
  /** Sub text to show for the accordion (on right side)  */
  subText?: string;
  /** Status of the progress (defaults to pending) */
  status?: 'complete' | 'in-progress' | 'invalid' | 'pending';
  /** Indicate if item is first accordion loaded (if using group. Set true if single accordion) */
  firstStep?: boolean;
  /** Indicate if open.  Component handles open changes. */
  open?: boolean;
  /** On press callback. Component will toggle open automatically. */
  onPress?: (value: boolean, event: GestureResponderEvent) => void;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
  /** Children to render */
  children?: React.ReactNode;
};

/**
 * ProgressIndicator component for rendering a step by step progress flow
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/ProgressIndicator.tsx | Example code}
 */

export class ProgressIndicator extends React.Component<ProgressIndicatorProps> {
  state = {
    open: false,
  };

  private get itemColor(): string {
    const { disabled } = this.props;

    return disabled ? getColor('textDisabled') : getColor('textPrimary');
  }

  private get styles() {
    const { disabled } = this.props;

    return StyleSheet.create({
      wrapper: {
        borderBottomColor: getColor('borderSubtle00'),
        borderBottomWidth: 1,
      },
      content: {
        paddingLeft: 64,
        paddingTop: 8,
        paddingRight: 64,
        paddingBottom: 24,
      },
      action: {
        position: 'relative',
        minHeight: 48,
        padding: 13,
        paddingLeft: 14,
        paddingRight: 48,
        flexDirection: 'row',
      },
      actionText: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      statusIcon: {
        marginRight: 30,
      },
      iconStyle: {
        position: 'absolute',
        top: 14,
        right: 14,
      },
      mainText: {
        color: this.itemColor,
        flex: 1,
        minWidth: 100,
      },
      subText: {
        color: disabled ? getColor('textDisabled') : getColor('textSecondary'),
      },
    });
  }

  private get accordionIcon(): React.ReactNode {
    const { open } = this.state;

    return <View style={this.styles.iconStyle}>{createIcon(open ? ChevronUpIcon : ChevronDownIcon, 20, 20, this.itemColor)}</View>;
  }

  private get stepIcon(): React.ReactNode {
    const { status } = this.props;
    let icon = createIcon(PendingIcon, 20, 20, getColor('interactive'));

    switch (status) {
      case 'complete':
        icon = createIcon(CheckmarkIcon, 20, 20, getColor('interactive'));
        break;
      case 'in-progress':
        icon = createIcon(ActiveIcon, 20, 20, getColor('interactive'));
        break;
      case 'invalid':
        icon = createIcon(ErrorIcon, 20, 20, getColor('supportError'));
        break;
      case 'pending':
      default:
        icon = createIcon(PendingIcon, 20, 20, getColor('interactive'));
    }

    return <View style={this.styles.statusIcon}>{icon}</View>;
  }

  private toggleDropdown = (event: GestureResponderEvent): void => {
    const { open } = this.state;
    const { onPress } = this.props;

    this.setState({ open: !open }, () => {
      if (typeof onPress === 'function') {
        onPress(!open, event);
      }
    });
  };

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  componentDidUpdate(previosuProps: ProgressIndicatorProps): void {
    const { open } = this.props;

    if (open !== previosuProps.open && typeof open === 'boolean') {
      this.setState({ open: open });
    }
  }

  componentDidMount(): void {
    const { open } = this.props;

    if (open) {
      this.setState({ open: true });
    }
  }

  render(): React.ReactNode {
    const { componentProps, style, disabled, title, children, firstStep, subText } = this.props;
    const { open } = this.state;
    const finalStyle = styleReferenceBreaker(this.styles.wrapper);

    if (firstStep) {
      finalStyle.borderTopColor = getColor('borderSubtle00');
      finalStyle.borderTopWidth = 1;
    }

    return (
      <View style={styleReferenceBreaker(finalStyle, style)} {...(componentProps || {})}>
        <Pressable style={(state) => pressableFeedbackStyle(state, this.styles.action, this.getStateStyle)} accessibilityLabel={title} accessibilityHint={subText} accessibilityRole="togglebutton" onPress={this.toggleDropdown} disabled={disabled}>
          {this.stepIcon}
          <View style={this.styles.actionText}>
            <Text style={this.styles.mainText} text={title} />
            {!!subText && <Text style={this.styles.subText} text={subText} />}
          </View>
          {this.accordionIcon}
        </Pressable>
        {open && <View style={this.styles.content}>{children}</View>}
      </View>
    );
  }
}
