import type { GestureResponderEvent, StyleProp, ViewStyle, PressableProps } from 'react-native';
import type { CarbonIcon } from './shared';

/**
 * Represents a navigation button for all navigation components and flows.
 */
export type NavigationButton = {
  /** Text to use for label of navigation item */
  text: string;
  /** Icon to use for navigation item (size 20) */
  icon: CarbonIcon;
  /** Indicate if navigatioin item is active */
  active?: boolean;
  /** Indicate if navigation item is disabled */
  disabled?: boolean;
  /** onPress event for navigation item */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event for navigation item */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
}

/**
 * Represents a toolbar button for all navigation components and flows.
 */
 export type ToolbarButton = {
  /** Text to use for label of toolbar item. When used with icon is not shown and used for accessibility only. */
  text: string;
  /** Icon to use for toolbar item (size 20) */
  icon?: CarbonIcon;
  /** Indicate if toolbar item is disabled */
  disabled?: boolean;
  /** Alignment (defaults to center) */
  alignItem?: 'left'|'right'|'center';
  /** onPress event for toolbar item */
  onPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event for toolbar item */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
}
