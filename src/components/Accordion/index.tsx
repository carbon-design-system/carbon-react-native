import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, GestureResponderEvent, Pressable } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import ChevronDownIcon from '@carbon/icons/es/chevron--down/20';
import ChevronUpIcon from '@carbon/icons/es/chevron--up/20';
import { Text } from '../Text';


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
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
  /** Children to render */
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: getColor('layerAccentActive03'),
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
    height: 48,
    padding: 13,
    paddingLeft: 16,
    paddingRight: 50,
  },
  iconStyle: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

/**
 * React Native does not allow zIndex to overlay non sibling Views.
 * Therefore without extreme control when using this component of lowering zIndex of Views around it this will not work great.
 * Therefore this will open a full screen overlay menu system.
 * We should try and find a better way. But as of now does not seem to work with zIndex.
 */
export class Accordion extends React.Component<AccordionProps> {
  state = {
    open: false,
  }

  private get itemColor(): string {
    const {disabled} = this.props;

    return disabled ? getColor('textDisabled') : getColor('textPrimary');
  }

  private get accordionIcon(): React.ReactNode {
    const {open} = this.state;

    return (
      <View style={styles.iconStyle}>
        {createIcon(open ? ChevronUpIcon : ChevronDownIcon, 22, 22, this.itemColor)}
      </View>
    );
  }

  private toggleDropdown = (): void => {
    const {open} = this.state;
    this.setState({open: !open});
  }

  componentDidUpdate(previosuProps: AccordionProps): void {
    const {open} = this.props;

    if (open !== previosuProps.open && typeof open === 'boolean') {
      this.setState({open: open});
    }
  }

  componentDidMount(): void {
    const {open} = this.props;

    if (open) {
      this.setState({open: true});
    }
  }

  render(): React.ReactNode {
    const {componentProps, style, disabled, title, children, firstAccordion} = this.props;
    const {open} = this.state;
    const finalStyle = styleReferenceBreaker(styles.wrapper);

    if (firstAccordion) {
      finalStyle.borderTopColor = getColor('layerAccentActive03');
      finalStyle.borderTopWidth = 1;
    }

    return (
      <View style={styleReferenceBreaker(finalStyle, style)} {...(componentProps || {})}>
        <Pressable style={styles.action} accessibilityLabel={title} accessibilityRole="togglebutton" onPress={this.toggleDropdown} disabled={disabled}>
          <Text style={{color: this.itemColor}} text={title} />
          {this.accordionIcon}
        </Pressable>
        {open && <View style={styles.content}>{children}</View>}
      </View>
    );
  }
}
