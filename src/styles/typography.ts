/**
 * This file includes all the exported typography styles.  These are auto used by the `Text` component.
 * You can use them directly for any other text styles.
 * This repo includes only the fonts used directly.
 * If you want to use other fonts you can download them and store them in your app and follow same directions on README.
 */

/** Font weights supported */
export type FontWeights = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;

/** Declaration of standard Font item */
export type FontDefinition = {
  fontWeight: FontWeights;
  fontFamily: string;
};

/** Font override type */
export type FontDefinitionOverrides = {
  light?: FontDefinition;
  regular?: FontDefinition;
  semiBold?: FontDefinition;
  monoRegular?: FontDefinition;
};

/**
 * @ignore
 * The override font definition to store
 */
let overrideFontDefinition: FontDefinitionOverrides = {};

/**
 * Override internal font groups. By default Carbon uses Plex.
 * You can override with your own font family here. You can choose to only override some or all.
 * You must install the fonts and setup React Native to bundle your custom font family if not using an available system font.
 *
 * @param overrides - The font sets the app use internally
 */
export const overrideFonts = (overrides: FontDefinitionOverrides): void => {
  if (overrides && typeof overrides === 'object') {
    overrideFontDefinition = overrides;
  }
};

/** Font light styling */
export const LightFont = (): FontDefinition => {
  return (
    overrideFontDefinition.light || {
      fontWeight: '300' as FontWeights,
      fontFamily: 'IBMPlexSans-Light',
    }
  );
};

/** Font regular styling */
export const RegularFont = (): FontDefinition => {
  return (
    overrideFontDefinition.regular || {
      fontWeight: '400' as FontWeights,
      fontFamily: 'IBMPlexSans-Regular',
    }
  );
};

/** Font semi-bold styling */
export const SemiBoldFont = (): FontDefinition => {
  return (
    overrideFontDefinition.semiBold || {
      fontWeight: '600' as FontWeights,
      fontFamily: 'IBMPlexSans-SemiBold',
    }
  );
};

/** Font Mono regular styling */
export const MonoRegularFont = (): FontDefinition => {
  return (
    overrideFontDefinition.monoRegular || {
      fontWeight: '400' as FontWeights,
      fontFamily: 'IBMPlexMono',
    }
  );
};

/** Code-01 text style (Productive) */
export const Code01 = () => {
  return {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.32,
    ...MonoRegularFont(),
  };
};

/** Code-02 text style (Expressive) */
export const Code02 = () => {
  return {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.32,
    ...MonoRegularFont(),
  };
};

/** Label-01 text style (Productive) */
export const Label01 = () => {
  return {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.32,
    ...RegularFont(),
  };
};

/** Label-02 text style (Expressive) */
export const Label02 = () => {
  return {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.16,
    ...RegularFont(),
  };
};

/** Helper-text-01 text style (Productive) */
export const HelperText01 = () => {
  return {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.32,
    ...RegularFont(),
  };
};

/** Helper-text-02 text style (Expressive) */
export const HelperText02 = () => {
  return {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.16,
    ...RegularFont(),
  };
};

/** Legal-01 text style (Productive) */
export const Legal01 = () => {
  return {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.32,
    ...RegularFont(),
  };
};

/** Legal-02 text style (Expressive) */
export const Legal02 = () => {
  return {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.16,
    ...RegularFont(),
  };
};

/** Body-compact-01 text style (Productive) */
export const BodyCompact01 = () => {
  return {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.16,
    ...RegularFont(),
  };
};

/** Body-compact-02 text style (Expressive) */
export const BodyCompact02 = () => {
  return {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    ...RegularFont(),
  };
};

/** Body-01 text style (Productive) */
export const Body01 = () => {
  return {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.16,
    ...RegularFont(),
  };
};

/** Body-02 text style (Expressive) */
export const Body02 = () => {
  return {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    ...RegularFont(),
  };
};

/** Heading-compact-01 text style (Productive) */
export const HeadingCompact01 = () => {
  return {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.16,
    ...SemiBoldFont(),
  };
};

/** Heading-compact-02 text style (Expressive) */
export const HeadingCompact02 = () => {
  return {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    ...SemiBoldFont(),
  };
};

/** Heading-01 text style (Productive) */
export const Heading01 = () => {
  return {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.16,
    ...SemiBoldFont(),
  };
};

/** Heading-02 text style (Expressive) */
export const Heading02 = () => {
  return {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    ...SemiBoldFont(),
  };
};

/** Heading-03 text style (Productive) */
export const Heading03 = () => {
  return {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    ...RegularFont(),
  };
};

/** Heading-04 text style (Productive) */
export const Heading04 = () => {
  return {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
    ...RegularFont(),
  };
};

/** Heading-05 text style (Productive) */
export const Heading05 = () => {
  return {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
    ...LightFont(),
  };
};

/** Heading-06 text style (Productive) */
export const Heading06 = () => {
  return {
    fontSize: 42,
    lineHeight: 50,
    letterSpacing: 0,
    ...LightFont(),
  };
};

/** Heading-07 text style (Productive) */
export const Heading07 = () => {
  return {
    fontSize: 54,
    lineHeight: 64,
    letterSpacing: 0,
    ...LightFont(),
  };
};
