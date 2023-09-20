import React from 'react';
import { toString } from '@carbon/icon-helpers';
import { SvgXml } from 'react-native-svg';
import { getColor } from '../styles/colors';
import type { CarbonIcon } from '../types/shared';
import { Linking, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

/**
 * Log issues in console or other system that happen during the use of the library
 *
 * @param issue - Issue string for indicating where issue came from and what it was
 * @param data - any useful data for debugging issue
 */
export const logIssue = (issue: string, data: unknown): void => {
  console.warn(issue, data);
};

/**
 * Renders an icon from @Carbon/icons for React Native
 * Most have a slight padding in the SVG.  You can avoid this by adding a few extra pixels to size. For example 20 base icons can be 22 to compensate and match lineHeight for some compact font styles.
 *
 * @param icon - the icon to render (`import AddIcon from '@carbon/icons/es/add/20'` for example)
 * @param width - width of the icon, defaults to 100% (numbers are pixels but percent in string format are supported).
 * @param height - height of the icon, defaults to 100% (numbers are pixels but percent in string format are supported).
 * @param color - color of the icon, deafults to `icon-primary` from Carbon colors for the current theme.
 *
 * @returns - React Node to render on the screen.  If the icon fails to be created an X icon is rendered.
 */
export const createIcon = (icon: CarbonIcon, width?: string | number, height?: string | number, color?: string, key?: string | number): React.ReactNode => {
  try {
    const iconString = toString(icon) as string;

    return <SvgXml color={color || getColor('iconPrimary')} xml={iconString} width={width || '100%'} height={height || '100%'} key={key} />;
  } catch (error) {
    logIssue('createIcon: failed to create the icon', error);
    const backupIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.17 13.69"><line x1="0.71" y1="0.97" x2="12.46" y2="12.72" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1.02" y1="13.02" x2="12.15" y2="0.67" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/></svg>';

    return <SvgXml color={color || getColor('iconPrimary')} xml={backupIcon} width={width || '100%'} height={height || '100%'} key={key} />;
  }
};

/**
 * This breaks reference to the original object for style manipulation.
 * TODO: find out prper flow from community.
 *
 * @param style - Style to break reference to
 * @param extraStyle - Style to break reference to
 * @returns - broken reference for the style
 */
export const styleReferenceBreaker = (style: any, extraStyle?: any): any => {
  let finalStyle = Object.assign({}, style || {});
  finalStyle = Object.assign(finalStyle, extraStyle || {});

  return finalStyle;
};

/**
 * Pressable styling helper for adding proper feedback to the user
 * Use on Pressable as `style={(state) => pressableFeedbackStyle(state, this.myStyle)}`
 *
 * @param state - State from the style function
 * @param style - Primary style to add to the pressable
 * @param customStyle - Function to use custom styling for state changes.  If using may not need this helper at all. But also not bad to have everything in one flow.
 *
 * @returns - Styled for handling press style
 */
export const pressableFeedbackStyle = (state: PressableStateCallbackType, style: StyleProp<ViewStyle>, customStyle?: (state: PressableStateCallbackType) => StyleProp<ViewStyle>): StyleProp<ViewStyle> => {
  return [
    style,
    typeof customStyle === 'function'
      ? customStyle(state)
      : {
          opacity: state.pressed ? 0.8 : 1,
        },
  ];
};

/**
 * Safely open a URL and handle pre-checking and post handling errors if encountered.
 *
 * @param url - URL scheme to pass to OS or Intent
 */
export const openLink = (url: string): void => {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url)
          .then(() => {})
          .catch((error) => {
            logIssue('openLink: unable to open supported requested link', { url, error });
          });
      } else {
        logIssue('openLink: unable to open requested link', { url });
      }
    })
    .catch((error) => {
      logIssue('openLink: unable to open requested link', { url, error });
    });
};
