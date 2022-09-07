import { Appearance } from 'react-native';
import * as g10 from '@carbon/themes/src/g10.js';
import * as g100 from '@carbon/themes/src/g100.js';
import { logIssue } from '../helpers';

/** Theme choices available */
export type ThemeChoices = 'light' | 'dark';

let themeOverride: ThemeChoices | null = null;

/**
 * Set the theme to use for all subsequent calls to the color getter.
 * To change themes on the fly you must have your style declarations retrieved on loads.
 * So you can destroy the view and reload after changing theem.
 *
 * To lock a theme (no auto themes) call this in your entry point (index or App [before any components])
 *
 * @param theme - the theme to force to. Use null to use system
 */
export const forceTheme = (theme: ThemeChoices | null): void => {
  themeOverride = theme;
};

/**
 * Indicate if dark mode should be used for theming.
 * @returns boolean indicating if dark mode is used for the system
 */
export const useDarkMode = (): boolean => {
  if (themeOverride) {
    return themeOverride === 'dark';
  }

  return Appearance.getColorScheme() === 'dark';
};

/** Component colors are not part of themes and are in the main library; which is quite large. So hardcoding for now */
const componentsG10: { [key: string]: string } = {
  buttonPrimary: '#0f62fe',
  buttonPrimaryHover: '#0353e9',
  buttonPrimaryActive: '#002d9c',
  buttonSecondary: '#393939',
  buttonSecondaryHover: '#4c4c4c',
  buttonSecondaryActive: '#6f6f6f',
  buttonTertiary: '#0f62fe',
  buttonTertiaryHover: '#0353e9',
  buttonTertiaryActive: '#002d9c',
  buttonDangerPrimary: '#da1e28',
  buttonDangerSecondary: '#da1e28',
  buttonDangerHover: '#ba1b23',
  buttonDangerActive: '#750e13',
  buttonSeparator: '#e0e0e0',
  buttonDisabled: '#c6c6c6',
  tagBackgroundRed: '#Ffd7D9',
  tagColorRed: '#750e13',
  tagHoverRed: '#ffb3b8',
  tagBackgroundMagenta: '#ffd6e8',
  tagColorMagenta: '#740937',
  tagHoverMagenta: '#ffafd2',
  tagBackgroundPurple: '#e8daff',
  tagColorPurple: '#491d8b',
  tagHoverPurple: '#d4bbff',
  tagBackgroundBlue: '#d0e2ff',
  tagColorBlue: '#002d9c',
  tagHoverBlue: '#a6c8ff',
  tagBackgroundCyan: '#bae6ff',
  tagColorCyan: '#003a6d',
  tagHoverCyan: '#82cfff',
  tagBackgroundTeal: '#9ef0f0',
  tagColorTeal: '#004144',
  tagHoverTeal: '#3ddbd9',
  tagBackgroundGreen: '#a7f0ba',
  tagColorGreen: '#044317',
  tagHoverGreen: '#6fdc8c',
  tagBackgroundGray: '#e0e0e0',
  tagColorGray: '#393939',
  tagHoverGray: '#c6c6c6',
  tagBackgroundCoolGray: '#dde1e6',
  tagColorCoolGray: '#343a3f',
  tagHoverCoolGray: '#c1c7cd',
  tagBackgroundWarmGray: '#e5e0df',
  tagColorWarmGray: '#3c3838',
  tagHoverWarmGray: '#cac5c4',
  notificationBackgroundError: '#fff1f1',
  notificationBackgroundWarning: '#fdf6dd',
  notificationBackgroundSuccess: '#defbe6',
  notificationBackgroundInfo: '#edf5ff',
};

/** Component colors are not part of themes and are in the main library; which is quite large. So hardcoding for now */
const componentsG100: { [key: string]: string } = {
  buttonPrimary: '#0f62fe',
  buttonPrimaryHover: '#0353e9',
  buttonPrimaryActive: '#002d9c',
  buttonSecondary: '#6f6f6f',
  buttonSecondaryHover: '#606060',
  buttonSecondaryActive: '#393939',
  buttonTertiary: '#ffffff',
  buttonTertiaryHover: '#f4f4f4',
  buttonTertiaryActive: '#c6c6c6',
  buttonDangerPrimary: '#da1e28',
  buttonDangerSecondary: '#fa4d56',
  buttonDangerHover: '#ba1b23',
  buttonDangerActive: '#750e13',
  buttonSeparator: '#161616',
  buttonDisabled: '#525252',
  tagBackgroundRed: '#a2191f',
  tagColorRed: '#ffd7d9',
  tagHoverRed: '#c21e25',
  tagBackgroundMagenta: '#9f1853',
  tagColorMagenta: '#ffd6e8',
  tagHoverMagenta: '#bf1d63',
  tagBackgroundPurple: '#6929c4',
  tagColorPurple: '#e8daff',
  tagHoverPurple: '#7c3dd6',
  tagBackgroundBlue: '#0043ce',
  tagColorBlue: '#d0e2ff',
  tagHoverBlue: '#0053ff',
  tagBackgroundCyan: '#00539a',
  tagColorCyan: '#bae6ff',
  tagHoverCyan: '#0066bd',
  tagBackgroundTeal: '#005d5d',
  tagColorTeal: '#9ef0f0',
  tagHoverTeal: '#007070',
  tagBackgroundGreen: '#0e6027',
  tagColorGreen: '#a7f0ba',
  tagHoverGreen: '#11742f',
  tagBackgroundGray: '#525252',
  tagColorGray: '#e0e0e0',
  tagHoverGray: '#636363',
  tagBackgroundCoolGray: '#4d5358',
  tagColorCoolGray: '#dde1e6',
  tagHoverCoolGray: '#5d646a',
  tagBackgroundWarmGray: '#565151',
  tagColorWarmGray: '#e5e0df',
  tagHoverWarmGray: '#696363',
  notificationBackgroundError: '#fff1f1',
  notificationBackgroundWarning: '#fdf6dd',
  notificationBackgroundSuccess: '#defbe6',
  notificationBackgroundInfo: '#edf5ff',
};

/**
 * Get the color already for the current theme
 * See: https://github.com/carbon-design-system/carbon/blob/main/packages/themes/src/g10.js
 * See: https://github.com/carbon-design-system/carbon/blob/main/packages/themes/src/g100.js
 * @param token - the Carbon (@carbon/theme you have installed) token name in camel case.
 * @param overrideTheme - force return of specific theme color (will ignore system)
 */
export const getColor = (token: string, overrideTheme?: ThemeChoices): string => {
  let foundLightColor = g10[token] || componentsG10[token];
  let foundDarkColor = g100[token] || componentsG100[token];

  if (!foundLightColor) {
    logIssue('getColor: could not find requested color in light theme.', {
      token,
    });
    foundLightColor = '#161616';
  }

  if (!foundDarkColor) {
    logIssue('getColor: could not find requested color in dark theme.', {
      token,
    });
    foundLightColor = '#f4f4f4';
  }

  if (overrideTheme) {
    return overrideTheme === 'dark' ? foundDarkColor : foundLightColor;
  } else {
    return useDarkMode() ? foundDarkColor : foundLightColor;
  }
};

/** Carbon Drop shadow standard (down direction) */
export const shadowStyle = {
  shadowColor: '#000000',
  shadowOpacity: 0.3,
  shadowOffset: {
    width: 2,
    height: 1,
  },
};
