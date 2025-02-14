import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, GestureResponderEvent, Pressable, PressableStateCallbackType } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, pressableFeedbackStyle, styleReferenceBreaker } from '../../helpers';
import ChevronDownIcon from '@carbon/icons/es/chevron--down/20';
import ChevronUpIcon from '@carbon/icons/es/chevron--up/20';
import { Text, TextBreakModes } from '../Text';

/** Props for Accordion component */
export type AccordionProps = {
  /** Title to show for the accordion  */
  title: string;
  /** Indicate if item is first accordion loaded (if using group. Set true if single accordion) */
  firstAccordion?: boolean;
  /** Indicate if open.  Component handles open changes. */
  open?: boolean;
  /** On press callback. Component will toggle open automatically. */
  onPress?: (value: boolean, event: GestureResponderEvent) => void;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Break mode for text. Default is to wrap text */
  textBreakMode?: TextBreakModes;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
  /** Children to render */
  children?: React.ReactNode;
};

/**
 * Accordion component for showing the accept legal terms flow
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Accordion.tsx | Example code}
 */
export class Accordion extends React.Component<AccordionProps> {
  state = {
    open: false,
  };

  private get itemColor(): string {
    const { disabled } = this.props;

    return disabled ? getColor('textDisabled') : getColor('textPrimary');
  }

  private get styles() {
    return StyleSheet.create({
      wrapper: {
        borderBottomColor: getColor('borderSubtle00'),
        borderBottomWidth: 1,
      },
      content: {
        padding: 16,
        paddingTop: 8,
        paddingRight: 64,
        paddingBottom: 24,
      },
      action: {
        position: 'relative',
        minHeight: 48,
        padding: 13,
        paddingLeft: 16,
        paddingRight: 50,
      },
      iconStyle: {
        position: 'absolute',
        top: 12,
        right: 12,
      },
      textItem: {
        flex: 1,
        color: this.itemColor,
      },
    });
  }

  private getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
  };

  private get accordionIcon(): React.ReactNode {
    const { open } = this.state;

    return <View style={this.styles.iconStyle}>{createIcon(open ? ChevronUpIcon : ChevronDownIcon, 22, 22, this.itemColor)}</View>;
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

  componentDidUpdate(previosuProps: AccordionProps): void {
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

  render() {
    const { componentProps, style, disabled, title, children, firstAccordion, textBreakMode } = this.props;
    const { open } = this.state;
    const finalStyle: ViewStyle = styleReferenceBreaker(this.styles.wrapper);

    if (firstAccordion) {
      finalStyle.borderTopColor = getColor('borderSubtle00');
      finalStyle.borderTopWidth = 1;
    }

    return (
      <View style={[finalStyle, style]} {...(componentProps || {})}>
        <Pressable style={(state) => pressableFeedbackStyle(state, this.styles.action, this.getStateStyle)} accessibilityLabel={title} accessibilityRole="togglebutton" onPress={this.toggleDropdown} disabled={disabled}>
          <Text style={this.styles.textItem} text={title} breakMode={textBreakMode} />
          {this.accordionIcon}
        </Pressable>
        {open && <View style={this.styles.content}>{children}</View>}
      </View>
    );
  }
}
