import { Appearance } from 'react-native';
import * as g10 from '@carbon/themes/src/g10.js';
import * as g100 from '@carbon/themes/src/g100.js';

/**
 * Indicate if dark mode should be used for theming.
 * @returns boolean indicating if dark mode is used for the system
 */
export const useDarkMode = (): boolean => {
  return Appearance.getColorScheme() === 'dark';
};

/**
 * This locks the colors returned by getColor to what is on load.
 * This avoids theme changing midway in app life and loading both colors.
 */
const lockedUseDarkModeFlag = useDarkMode();

/** Button colors are not part of themes and are in the main library; which is quite large. So hardcoding for now */
const buttonG10: {[key: string]: string} = {
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
};

/** Button colors are not part of themes and are in the main library; which is quite large. So hardcoding for now */
const buttonG100: {[key: string]: string} = {
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
};

/**
 * Get the color already for the current theme
 * See: https://github.com/carbon-design-system/carbon/blob/main/packages/themes/src/g10.js
 * See: https://github.com/carbon-design-system/carbon/blob/main/packages/themes/src/g100.js
 * @param token - the Carbon (@carbon/theme you have installed) token name in camel case.
 * @param overrideTheme - force return of specific theme color (will ignore system)
 */
export const getColor = (token: string, overrideTheme?: 'light'|'dark'): string => {
  let foundLightColor = g10[token] || buttonG10[token];
  let foundDarkColor = g100[token] || buttonG100[token];

  if (!foundLightColor) {
    console.warn('getColor: could not find requested color in light theme.', {token});
    foundLightColor = '#161616';
  }

  if (!foundDarkColor) {
    console.warn('getColor: could not find requested color in dark theme.', {token});
    foundLightColor = '#f4f4f4';
  }

  if (overrideTheme) {
    return overrideTheme === 'dark' ? foundDarkColor : foundLightColor;
  } else {
    return lockedUseDarkModeFlag ? foundDarkColor : foundLightColor;
  }
};
